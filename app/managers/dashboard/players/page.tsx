'use client'
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { PlayerCard } from "@/components/players/player-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddPlayerDialog } from "@/components/players/add-player-dialog";
import Loader from "@/components/ux/FootLoader";
import { Player } from "@prisma/client";
import { supabase } from "@/lib/supabaseClient";
import PlayerList from "@/components/players/PlayerList";
import { PlayerFilters } from "@/components/players/player-filters";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchPlayers = async () => {
            // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      try {
        const response = await fetch( "/api/players");

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Joueurs</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un joueur
        </Button>
      </div>
      <div>
        <PlayerFilters/>
      </div>

      {loading ? (
        <Loader /> 
   
      ) : players.length > 0 ? (

        <div className="grid  gap-6">

          <PlayerList/>

        </div>
      ) : (
        <p>Aucun joueur disponible.</p>
      )}

      <AddPlayerDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
