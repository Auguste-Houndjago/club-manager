import { Position } from "@prisma/client";

export interface OpponentPlayer {
  id: string;
  name: string;
  position: Position;
  jerseyNumber: number;
}

export interface FormationPosition {
  x: number;
  y: number;
  position: Position;
}

export const OPPONENT_FORMATIONS = {
  "4-3-3": {
    positions: [
      { x: 50, y: 10, position: "GK" },
      { x: 20, y: 30, position: "DF" },
      { x: 35, y: 30, position: "DF" },
      { x: 65, y: 30, position: "DF" },
      { x: 80, y: 30, position: "DF" },
      { x: 30, y: 55, position: "MF" },
      { x: 50, y: 55, position: "MF" },
      { x: 70, y: 55, position: "MF" },
      { x: 25, y: 80, position: "FW" },
      { x: 50, y: 80, position: "FW" },
      { x: 75, y: 80, position: "FW" }
    ]
  },
  "4-4-2": {
    positions: [
      { x: 50, y: 10, position: "GK" },
      { x: 20, y: 30, position: "DF" },
      { x: 35, y: 30, position: "DF" },
      { x: 65, y: 30, position: "DF" },
      { x: 80, y: 30, position: "DF" },
      { x: 20, y: 55, position: "MF" },
      { x: 40, y: 55, position: "MF" },
      { x: 60, y: 55, position: "MF" },
      { x: 80, y: 55, position: "MF" },
      { x: 35, y: 80, position: "FW" },
      { x: 65, y: 80, position: "FW" }
    ]
  },
  "3-5-2": {
    positions: [
      { x: 50, y: 10, position: "GK" },
      { x: 30, y: 30, position: "DF" },
      { x: 50, y: 30, position: "DF" },
      { x: 70, y: 30, position: "DF" },
      { x: 20, y: 55, position: "MF" },
      { x: 35, y: 55, position: "MF" },
      { x: 50, y: 55, position: "MF" },
      { x: 65, y: 55, position: "MF" },
      { x: 80, y: 55, position: "MF" },
      { x: 35, y: 80, position: "FW" },
      { x: 65, y: 80, position: "FW" }
    ]
  }
};