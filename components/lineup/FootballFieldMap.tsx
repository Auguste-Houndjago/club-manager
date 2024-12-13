"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Position } from "@prisma/client";

import { PlayerCard } from "./PlayerCardMap";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FootballFieldBackground from "./TerrainMap";

export interface Player {
  id: string;
  firstName: string;
  position: Position;
  jerseyNumber: number;
}

interface DraggablePlayerProps {
  player: any;
  position: { x: number; y: number };
  onHover: (name: string | null) => void;
  onSelect: (player: Player) => void;
  getBadgeBorderColor: (position: string) => string;
  variant?: "secondary" | "default" | "outline";
}

interface FootballFieldProps {
  formation: string;
  players: Player[];
  positions: { [key: string]: { x: number; y: number } };
  onPlayerDrop: (playerId: string, position: { x: number; y: number }) => void;
}

const DraggablePlayer = ({ 
  player, 
  position, 
  onHover, 
  onSelect, 
  getBadgeBorderColor, 
  variant  
}: DraggablePlayerProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'player',
    item: { id: player.id, type: 'player' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));


  const playerName = player.firstName || player.name;

  return (
    <div
      ref={drag}
      className={`absolute cursor-pointer group transition-all duration-0 ${
        isDragging ? 'opacity-80 scale-105' : ''
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={() => onHover(playerName)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(player)}
    >
      <Badge 
        className={`md:w-12 md:h-12 rounded-full flex items-center justify-center hover:border-primary/50 cursor-pointer shadow-lg transition-transform hover:scale-110 ${getBadgeBorderColor(player.position)}`}
        variant={variant}
      >
        <span className="-px-8 text-[10px] duration-200 ease-out transition-all w-fit">
          {player.jerseyNumber}
        </span>
      </Badge>
      
      {/* Tooltip pour afficher le nom */}
      <div 
        className="
          absolute 
          top-full 
          left-1/2 
          transform 
          -translate-x-1/2 
          mt-2 
          bg-black/70 
          text-white 
          px-2 
          py-1 
          rounded 
          text-xs 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-200 
          pointer-events-none
          z-50
        "
      >
        {playerName}
      </div>
    </div>
  );
};

const DroppableField = ({ onDrop, children }: { onDrop: (x: number, y: number, item: any) => void, children: React.ReactNode }) => {
  const [, drop] = useDrop(() => ({
    accept: 'player',
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const element = document.getElementById('football-field');
        if (element) {
          const rect = element.getBoundingClientRect();
          const x = ((offset.x - rect.left) / rect.width) * 100;
          const y = ((offset.y - rect.top) / rect.height) * 100;
          onDrop(x, y, item);
        }
      }
    },
  }));

  return (
    <div ref={drop} id="football-field" className="relative w-full h-[450px] md:h-[750px] rounded-lg overflow-hidden shadow-xl">
      {children}
    </div>
  );
};

const opponentPlayers = [
    { id: 'opp1', name: 'Opponent 1', position: 'GK', jerseyNumber: 1 },
    { id: 'opp2', name: 'Opponent 2', position: 'DF', jerseyNumber: 2 },
    { id: 'opp3', name: 'Opponent 3', position: 'DF', jerseyNumber: 3 },
    { id: 'opp4', name: 'Opponent 4', position: 'DF', jerseyNumber: 4 },
    { id: 'opp5', name: 'Opponent 5', position: 'DF', jerseyNumber: 5 },
    { id: 'opp6', name: 'Opponent 6', position: 'MF', jerseyNumber: 6 },
    { id: 'opp7', name: 'Opponent 7', position: 'MF', jerseyNumber: 7 },
    { id: 'opp8', name: 'Opponent 8', position: 'MF', jerseyNumber: 8 },
    { id: 'opp9', name: 'Opponent 9', position: 'FW', jerseyNumber: 9 },
    { id: 'opp10', name: 'Opponent 10', position: 'FW', jerseyNumber: 10 },
    { id: 'opp11', name: 'Opponent 11', position: 'FW', jerseyNumber: 11 },
  ];

export function FootballField({ formation, players, positions,  onPlayerDrop }: FootballFieldProps) {
  const [showOpponents, setShowOpponents] = useState(false);
  const [opponentPositions, setOpponentPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  
 

  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const defaultPositions = useMemo(() => {
    const [defenders, midfielders, forwards] = formation.split("-").map(Number);
    const positions: { [key: string]: { x: number; y: number }[] } = {
      GK: [{ x: 50, y: 90 }],
      DF: Array.from({ length: defenders }, (_, i) => ({
        x: 20 + (60 / (defenders + 1)) * (i + 1),
        y: 70
      })),
      MF: Array.from({ length: midfielders }, (_, i) => ({
        x: 20 + (60 / (midfielders + 1)) * (i + 1),
        y: 45
      })),
      FW: Array.from({ length: forwards }, (_, i) => ({
        x: 20 + (60 / (forwards + 1)) * (i + 1),
        y: 20
      }))
    };
    return positions;
  }, [formation]);

  const defaultOpponentPositions = useMemo(() => {
    const [defenders, midfielders, forwards] = "4-3-3".split("-").map(Number);
    const positions: { [key: string]: { x: number; y: number }[] } = {
      GK: [{ x: 50, y: 10 }],
      DF: Array.from({ length: defenders }, (_, i) => ({
        x: 20 + (60 / (defenders + 1)) * (i + 1),
        y: 30
      })),
      MF: Array.from({ length: midfielders }, (_, i) => ({
        x: 20 + (60 / (midfielders + 1)) * (i + 1),
        y: 55
      })),
      FW: Array.from({ length: forwards }, (_, i) => ({
        x: 20 + (60 / (forwards + 1)) * (i + 1),
        y: 80
      }))
    };
    return positions;
  }, []);

  const getBadgeBorderColor = (position: string | Position) => {
    switch (position) {
      case "GK":
        return "border-yellow-500";
      case "DF":
        return "border-blue-500";
      case "MF":
        return "border-green-500";
      case "FW":
        return "border-red-500";
      default:
        return "border-gray-500";
    }
  };

  const handleDrop = (x: number, y: number, item: any) => {
    if (item.id.startsWith('opp')) {
      setOpponentPositions(prev => ({
        ...prev,
        [item.id]: { x, y }
      }));
    } else {
      onPlayerDrop(item.id, { x, y });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => setShowOpponents(!showOpponents)}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            {showOpponents ? "Hide Opponents" : "Show Opponents"}
      
          </Button>
        </div>
        
        <DroppableField onDrop={handleDrop}  >

          <FootballFieldBackground />
          
          
          {/* Players */}
          {players.map((player) => {
            const position = positions[player.id] || defaultPositions[player.position]?.[0];
            if (!position) return null;
            
            return (
              <DraggablePlayer
                key={player.id}
                player={player}
                position={position}
                onHover={setHoveredPlayer}
                onSelect={setSelectedPlayer}
                getBadgeBorderColor={getBadgeBorderColor}
                variant="secondary"
              />
            );
          })}

          {/* Opponent Players */}
          {showOpponents && opponentPlayers.map((player) => {
            const position = opponentPositions[player.id] || defaultOpponentPositions[player.position]?.[0];
            
            return (
              <DraggablePlayer
                key={player.id}
                player={player}
                position={position}
                onHover={setHoveredPlayer}
                onSelect={setSelectedPlayer}
                getBadgeBorderColor={getBadgeBorderColor}
                
              />
            );
          })}
       

        </DroppableField>

        {/* Player Details Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 bg-black/50 md:flex items-center justify-center p-4 z-50">
            <div className="max-w-lg w-full">
              <PlayerCard 
                player={selectedPlayer} 
                onClose={() => setSelectedPlayer(null)} 
              />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}