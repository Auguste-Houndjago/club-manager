import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { 
  User, 
  Flag, 
  Ruler, 
  Weight, 
  Shirt, 
  Activity, 
  Trophy, 
  Clock, 
  X 
} from 'lucide-react'

// Types are kept the same as in the original component
interface PlayerStats {
  gamesPlayed: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
}

interface PlayerDetails {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  nationality: string
  position: string
  jerseyNumber?: number
  height?: number
  weight?: number
  profileImage?: string
  statistics?: PlayerStats
}

interface PlayerCardProps {
  player: Partial<PlayerDetails>
  onClose: () => void
}

export function PlayerCard({ player, onClose }: PlayerCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mock data with default values (same as original)
  const mockPlayer: PlayerDetails = {
    id: player.id || "mock-id",
    firstName: player.firstName || "Komi",
    lastName: player.lastName || "Etru",
    dateOfBirth: player.dateOfBirth || new Date("1995-01-01"),
    nationality: player.nationality || "France",
    position: player.position || "FW",
    jerseyNumber: player.jerseyNumber || 10,
    height: player.height || 180,
    weight: player.weight || 75,
    profileImage: player.profileImage || "/admin.png",
    statistics: {
      gamesPlayed: 15,
      goals: 8,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1250
    }
  }

  const age = Math.floor(
    (new Date().getTime() - new Date(mockPlayer.dateOfBirth).getTime()) / 3.15576e10
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent border-md ">
      <div 
        className={`
          w-full max-w-md  md:scale-0 scale-[0.8]
          relative 
          transition-all 
          duration-500 
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        <div 
          className="
            absolute 
            inset-0 
            bg-white/30 
            dark:bg-black/40 
            backdrop-blur-xl 
            rounded-2xl 
            shadow-2xl 
            border 
            border-white/20 
            dark:border-white/10
          "
        />
        
        <Card 
          className="
            relative 
            z-10 
            bg-transparent 
            border-none 
            overflow-hidden
          "
        >
          <div className="relative z-20">
            <button
              onClick={onClose}
              className="
                absolute 
                right-4 
                top-4 
                text-black
                hover:text-black 
                dark:text-white/60 
                dark:hover:text-white 
                transition-colors 
                rounded-full 
                p-2 
                hover:bg-black/10 
                dark:hover:bg-white/10
              "
            >
              <X className="h-6 w-6" />
            </button>
            
            <CardContent className="p-6">
              {/* Player Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-white/20 dark:bg-black/20 shadow-md"></div>
                  <img
                    src={mockPlayer.profileImage}
                    alt={`${mockPlayer.firstName} ${mockPlayer.lastName}`}
                    className="
                      absolute 
                      inset-0 
                      w-28 
                      h-28 
                      rounded-full 
                      object-cover 
                      border-4 
                      border-white/50 
                      dark:border-white/20
                      shadow-lg
                    "
                  />
                </div>
                <div>
                  <h2 className="
                    text-3xl 
                    font-bold 
                    text-black 
                    dark:text-white
                    mb-1
                  ">
                    {`${mockPlayer.firstName} ${mockPlayer.lastName}`}
                  </h2>
                  <p className="
                    text-lg 
                    text-black
                    dark:text-white/70
                    mb-2
                  ">
                    {mockPlayer.position}
                  </p>
                  <div className="flex items-center text-black/70 dark:text-white/70">
                    <Shirt className="w-5 h-5 mr-2" />
                    <span className="text-xl font-semibold">
                      {mockPlayer.jerseyNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Player Information Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Personal Info */}
                <div>
                  <h3 className="
                    font-semibold 
                    mb-4 
                    text-lg 
                    text-black 
                    dark:text-white/80 
                    border-b 
                    border-black/10 
                    dark:border-white/10 
                    pb-2
                  ">
                    Personal Info
                  </h3>
                  <div className="space-y-3">
                    <PlayerInfoItem 
                      icon={<User className="w-4 h-4" />} 
                      label="Age" 
                      value={`${age} years`} 
                    />
                    <PlayerInfoItem 
                      icon={<Flag className="w-4 h-4" />} 
                      label="" 
                      value={mockPlayer.nationality} 
                    />
                    <PlayerInfoItem 
                      icon={<Ruler className="w-4 h-4" />} 
                      label="Height" 
                      value={`${mockPlayer.height} cm`} 
                    />
                    <PlayerInfoItem 
                      icon={<Weight className="w-4 h-4" />} 
                      label="Weight" 
                      value={`${mockPlayer.weight} kg`} 
                    />
                  </div>
                </div>

                {/* Season Stats */}
                <div>
                  <h3 className="
                    font-semibold 
                    mb-4 
                    text-lg 
                    text-black 
                    dark:text-white/80 
                    border-b 
                    border-black/10 
                    dark:border-white/10 
                    pb-2
                  ">
                    Season Stats
                  </h3>
                  <div className="space-y-3">
                    <PlayerInfoItem 
                      icon={<Activity className="w-4 h-4" />} 
                      label="Games" 
                      value={mockPlayer.statistics?.gamesPlayed.toString() || ''} 
                    />
                    <PlayerInfoItem 
                      icon={<Trophy className="w-4 h-4" />} 
                      label="Goals" 
                      value={mockPlayer.statistics?.goals.toString() || ''} 
                    />
                    <PlayerInfoItem 
                      icon={<Trophy className="w-4 h-4" />} 
                      label="Assists" 
                      value={mockPlayer.statistics?.assists.toString() || ''} 
                    />
                    <PlayerInfoItem 
                      icon={<Clock className="w-4 h-4" />} 
                      label="Minutes" 
                      value={mockPlayer.statistics?.minutesPlayed.toString() || ''} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Composant réutilisable pour les éléments d'information
function PlayerInfoItem({ 
  icon, 
  label, 
  value 
}: { 
  icon?: React.ReactNode; 
  label: string; 
  value: string 
}) {
  return (
    <div className="
      flex 
      items-center 
      justify-between 
      text-black 
      dark:text-white/70 
      bg-white/80 
      dark:bg-black/20 
      px-3 
      py-2 
      rounded-lg 
      transition 
      hover:bg-white/40 
      dark:hover:bg-black/40
    ">
      <div className="flex items-center space-x-3">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>
      <span className="font-semibold text-black dark:text-white/80">
        {value}
      </span>
    </div>
  )
}

export default PlayerCard