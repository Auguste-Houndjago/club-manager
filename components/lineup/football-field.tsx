"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Position, Player, Coordinates } from "@/types/football";
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

interface FootballFieldProps {
  formation: string;
  players: Player[];
  positions: { [key: string]: Coordinates };
  onPlayerDrop: (playerId: string, position: Coordinates) => void;
}

// Opponent team mock data
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

export function FootballField({ formation, players, positions, onPlayerDrop }: FootballFieldProps) {
  const [showOpponents, setShowOpponents] = useState(false);
  const [opponentPositions, setOpponentPositions] = useState<{ [key: string]: Coordinates }>({});
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const defaultPositions = useMemo(() => {
    const [defenders, midfielders, forwards] = formation.split("-").map(Number);
    const positions: { [key: string]: Coordinates[] } = {
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
    const positions: { [key: string]: Coordinates[] } = {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    const fieldElement = document.querySelector('.football-field');
    if (!fieldElement) return;

    const rect = fieldElement.getBoundingClientRect();
    const x = ((event.delta.x + rect.left) / rect.width) * 100;
    const y = ((event.delta.y + rect.top) / rect.height) * 100;

    const playerId = active.id as string;
    
    if (playerId.startsWith('opp')) {
      setOpponentPositions(prev => ({
        ...prev,
        [playerId]: { x, y }
      }));
    } else {
      onPlayerDrop(playerId, { x, y });
    }
  };

  return (
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
      
      <DndContext 
        sensors={sensors}
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <div 
          className="football-field relative w-full h-[450px] md:h-[750px] rounded-lg overflow-hidden shadow-xl"
          style={{
            background: 'url("/football-field.svg") center/cover no-repeat',
          }}
        >
          {/* Players */}
          {players.map((player) => {
            const position = positions[player.id] || defaultPositions[player.position]?.[0];
            if (!position) return null;

            return (
              <div
                key={player.id}
                id={player.id}
                onMouseEnter={() => setHoveredPlayer(player.firstName)}
                onMouseLeave={() => setHoveredPlayer(null)}
                className="absolute touch-none"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Badge 
                  className={`md:w-12 md:h-12 rounded-full flex items-center justify-center hover:border-primary/50 cursor-move shadow-lg transition-transform hover:scale-110 ${getBadgeBorderColor(player.position)}`}
                  variant="secondary"
                >
                  <span className="-px-8 text-[10px] duration-200 ease-out transition-all w-fit">
                    {hoveredPlayer ? player.firstName : player.jerseyNumber}
                  </span>
                </Badge>
              </div>
            );
          })}

          {/* Opponent Players */}
          {showOpponents && opponentPlayers.map((player) => {
            const position = opponentPositions[player.id] || defaultOpponentPositions[player.position]?.[0];
            if (!position) return null;

            return (
              <div
                key={player.id}
                id={player.id}
                className="absolute touch-none"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Badge
                  className={`md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-move shadow-lg transition-transform hover:scale-110 border-2 ${getBadgeBorderColor(player.position)}`}
                >
                  {player.jerseyNumber}
                </Badge>
              </div>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}