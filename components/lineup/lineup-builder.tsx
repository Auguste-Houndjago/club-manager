"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PlayerList } from "./player-list";
import { Position } from "@prisma/client";
import { FootballField } from "./FootballFieldMap";

import { assignPlayersToPositions } from "@/lib/formation-utils";
import { FORMATIONS } from "@/constants/formations";

export interface Player {
  id: string;
  firstName: string;
  position: Position;
  jerseyNumber: number;
}

export function LineupBuilder() {
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [fieldPositions, setFieldPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [isPortrait, setIsPortrait] = useState(false); 

  useEffect(() => {
    if (selectedPlayers.length > 0) {
      const newPositions = assignPlayersToPositions(selectedPlayers, selectedFormation);
      setFieldPositions(newPositions);
    }
  }, [selectedFormation, selectedPlayers]);

  const handlePlayerDrop = (playerId: string, position: { x: number; y: number }) => {
    setFieldPositions((prev) => ({
      ...prev,
      [playerId]: position,
    }));
  };

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.length < 11 && !selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handlePlayerRemove = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId));
    const newPositions = { ...fieldPositions };
    delete newPositions[playerId];
    setFieldPositions(newPositions);
  };

  const handleFormationChange = (formation: string) => {
    setSelectedFormation(formation);
  };

  const toggleOrientation = () => {
    setIsPortrait((prev) => !prev); 
  };

  return (
    <div className="grid gap-6 gap-x-2 md:grid-cols-[300px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedFormation} onValueChange={handleFormationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select formation" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(FORMATIONS).map((formation) => (
                  <SelectItem key={formation} value={formation}>
                    {formation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center text-base font-bold">
              Selected Players <span className="text-red-400 ml-2">({selectedPlayers.length}/11)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {selectedPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{player.jerseyNumber}</Badge>
                      <span>{player.firstName}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlayerRemove(player.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <PlayerList onPlayerSelect={handlePlayerSelect} selectedPlayers={selectedPlayers} />
      </div>

      <Card className="px-0">
        <CardHeader>
          <CardTitle>
            Field Setup

          </CardTitle>
        </CardHeader>

        <CardContent  className={`px-4   ${isPortrait? "rotate-90 relative" : " "}`}>
  

          {selectedPlayers && (
            <FootballField
              formation={selectedFormation}
              players={selectedPlayers}
              positions={fieldPositions}
              onPlayerDrop={handlePlayerDrop}
            />
          )}
        </CardContent>
        <CardFooter>
        <Button className="hidden md:inline" onClick={()=>setIsPortrait(!isPortrait)}>
           orientation: ({isPortrait? "portrait" : "landscape"})
          </Button>
        </CardFooter>
      </Card>


    </div>
  );
}
