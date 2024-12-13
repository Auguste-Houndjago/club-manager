import { Position } from "@prisma/client";

export interface FormationPosition {
  x: number;
  y: number;
  position: Position;
}

export interface Formation {
  positions: FormationPosition[];
  defenders: number;
  midfielders: number;
  forwards: number;
}

export const FORMATIONS: { [key: string]: Formation } = {
  "4-3-3": {
    defenders: 4,
    midfielders: 3,
    forwards: 3,
    positions: [
      // Goalkeeper
      { x: 50, y: 90, position: "GK" },
      // Defenders - spread across the back
      { x: 20, y: 75, position: "DF" }, // Left back
      { x: 40, y: 75, position: "DF" }, // Left center back
      { x: 60, y: 75, position: "DF" }, // Right center back
      { x: 80, y: 75, position: "DF" }, // Right back
      // Midfielders - triangular formation
      { x: 35, y: 55, position: "MF" }, // Left midfielder
      { x: 50, y: 50, position: "MF" }, // Central midfielder
      { x: 65, y: 55, position: "MF" }, // Right midfielder
      // Forwards - spread across front
      { x: 30, y: 25, position: "FW" }, // Left forward
      { x: 50, y: 20, position: "FW" }, // Center forward
      { x: 70, y: 25, position: "FW" }, // Right forward
    ],
  },
  "4-4-2": {
    defenders: 4,
    midfielders: 4,
    forwards: 2,
    positions: [
      // Goalkeeper
      { x: 50, y: 90, position: "GK" },
      // Defenders
      { x: 20, y: 75, position: "DF" },
      { x: 40, y: 75, position: "DF" },
      { x: 60, y: 75, position: "DF" },
      { x: 80, y: 75, position: "DF" },
      // Midfielders - flat line
      { x: 20, y: 55, position: "MF" },
      { x: 40, y: 55, position: "MF" },
      { x: 60, y: 55, position: "MF" },
      { x: 80, y: 55, position: "MF" },
      // Forwards - two strikers
      { x: 35, y: 25, position: "FW" },
      { x: 65, y: 25, position: "FW" },
    ],
  },
  "3-5-2": {
    defenders: 3,
    midfielders: 5,
    forwards: 2,
    positions: [
      // Goalkeeper
      { x: 50, y: 90, position: "GK" },
      // Defenders - three at the back
      { x: 30, y: 75, position: "DF" },
      { x: 50, y: 75, position: "DF" },
      { x: 70, y: 75, position: "DF" },
      // Midfielders - diamond formation
      { x: 20, y: 55, position: "MF" }, // Left wingback
      { x: 40, y: 50, position: "MF" }, // Left midfielder
      { x: 50, y: 45, position: "MF" }, // Central midfielder
      { x: 60, y: 50, position: "MF" }, // Right midfielder
      { x: 80, y: 55, position: "MF" }, // Right wingback
      // Forwards
      { x: 35, y: 25, position: "FW" },
      { x: 65, y: 25, position: "FW" },
    ],
  },
  "4-2-3-1": {
    defenders: 4,
    midfielders: 5,
    forwards: 1,
    positions: [
      // Goalkeeper
      { x: 50, y: 90, position: "GK" },
      // Defenders
      { x: 20, y: 75, position: "DF" },
      { x: 40, y: 75, position: "DF" },
      { x: 60, y: 75, position: "DF" },
      { x: 80, y: 75, position: "DF" },
      // Defensive Midfielders
      { x: 40, y: 60, position: "MF" },
      { x: 60, y: 60, position: "MF" },
      // Attacking Midfielders
      { x: 30, y: 40, position: "MF" },
      { x: 50, y: 35, position: "MF" },
      { x: 70, y: 40, position: "MF" },
      // Striker
      { x: 50, y: 20, position: "FW" },
    ],
  },
};