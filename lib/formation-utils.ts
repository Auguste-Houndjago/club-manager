
import { Player } from "@/types/football";
import { FORMATIONS } from "../constants/formations";
import { OPPONENT_FORMATIONS, OpponentPlayer } from "@/constants/opponentsFormation";

export function assignPlayersToPositions(
  players: Player[],
  formation: string
) {
  const formationData = FORMATIONS[formation];
  if (!formationData) return {};

  const positions: { [key: string]: { x: number; y: number } } = {};
  const positionAssignments = new Map<string, Player>();

  // Sort players by position to ensure proper assignment
  const sortedPlayers = [...players].sort((a, b) => {
    const positionOrder = { GK: 0, DF: 1, MF: 2, FW: 3 };
    return positionOrder[a.position] - positionOrder[b.position];
  });

  // Assign goalkeeper first
  const goalkeeper = sortedPlayers.find(p => p.position === "GK");
  if (goalkeeper) {
    const gkPosition = formationData.positions.find(p => p.position === "GK");
    if (gkPosition) {
      positions[goalkeeper.id] = { x: gkPosition.x, y: gkPosition.y };
      positionAssignments.set("GK", goalkeeper);
    }
  }

  // Assign remaining players by position
  const remainingPlayers = sortedPlayers.filter(p => p.position !== "GK");
  const remainingPositions = formationData.positions.filter(p => p.position !== "GK");

  remainingPositions.forEach((pos, index) => {
    const player = remainingPlayers.find(
      p => p.position === pos.position && !positionAssignments.has(p.id)
    );
    if (player) {
      positions[player.id] = { x: pos.x, y: pos.y };
      positionAssignments.set(player.id, player);
    }
  });

  return positions;
}


export function assignOpponentPlayersToPositions(
    players: OpponentPlayer[],
    formation: string = "4-3-3"
  ) {
    const formationData = OPPONENT_FORMATIONS[formation as keyof typeof OPPONENT_FORMATIONS];
    if (!formationData) return {};
  
    const positions: { [key: string]: { x: number; y: number } } = {};
    const positionAssignments = new Map<string, OpponentPlayer>();
  
    // Sort players by position to ensure proper assignment
    const sortedPlayers = [...players].sort((a, b) => {
      const positionOrder = { GK: 0, DF: 1, MF: 2, FW: 3 };
      return positionOrder[a.position] - positionOrder[b.position];
    });

    const goalkeeper = sortedPlayers.find(p => p.position === "GK");
    if (goalkeeper) {
      const gkPosition = formationData.positions.find(p => p.position === "GK");
      if (gkPosition) {
        positions[goalkeeper.id] = { x: gkPosition.x, y: gkPosition.y };
        positionAssignments.set("GK", goalkeeper);
      }
    }
  
    // Assign remaining players by position
    const remainingPlayers = sortedPlayers.filter(p => p.position !== "GK");
    const remainingPositions = formationData.positions.filter(p => p.position !== "GK");
  
    remainingPositions.forEach((pos, index) => {
      const player = remainingPlayers.find(
        p => p.position === pos.position && !positionAssignments.has(p.id)
      );
      if (player) {
        positions[player.id] = { x: pos.x, y: pos.y };
        positionAssignments.set(player.id, player);
      }
    });
  
    return positions;
  }

//   export function createDefaultOpponentPlayers(formation: string = "4-3-3"): OpponentPlayer[] {
//     const formationData = OPPONENT_FORMATIONS[formation as keyof typeof OPPONENT_FORMATIONS];
    
//     return formationData.positions.map((pos, index) => ({
//       id: `opp${index + 1}`,
//       name: `Opponent ${index + 1}`,
//       position: pos.position,
//       jerseyNumber: index + 1
//     }));
//   }