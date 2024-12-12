"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamStats } from "@/components/statistics/team-stats"
import { PlayerStats } from "@/components/dashboard/player-stats"

export default function StatisticsPage() {
  return (
    <div className="space-y-6 px-2 sm:px-4 ">
      <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
        Statistiques
      </h1>

      <Tabs defaultValue="team" className="w-full max-w-3xl mx-auto">
        <TabsList className="flex flex-wrap justify-center sm:justify-start gap-2">
          <TabsTrigger value="team" className="px-2 py-2 sm:px-6">
            Équipe
          </TabsTrigger>
          <TabsTrigger value="players" className="px-2 py-2 sm:px-6">
            Joueurs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="team" className="mt-4">
          <TeamStats />
        </TabsContent>
        <TabsContent value="players" className="mt-4">
          <PlayerStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
