"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Player, Statistics } from "@prisma/client";
import { useEffect, useState } from "react";

export function PlayerStats() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<number>();
  const [stats, setStats] = useState<Statistics>();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players");

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const data = await response.json();
        setPlayers(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des joueurs :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    if (!playerId) return;

    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/players/${playerId}/statistics`);

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des statistiques :", err);
        setError(err.message);
      }
    };

    fetchStats();
  }, [playerId]);

  return (
    <Card className="p-2 sm:p-4 lg:p-8 w-[300px]">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center sm:text-left">
          Player Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Chargement des données...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Nationality</TableHead>
                    <TableHead>Games</TableHead>
                    <TableHead>Goals</TableHead>
                    <TableHead>Assists</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {player.firstName} {player.lastName}
                      </TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>{player.nationality}</TableCell>
                      <TableCell>{player.height}</TableCell>
                      <TableCell>{stats?.goals}</TableCell>
                      <TableCell>{stats?.assists}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
