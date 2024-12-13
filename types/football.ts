export type Position = "GK" | "DF" | "MF" | "FW";

export interface Player {
  id: string;
  firstName: string;
  position: Position;
  jerseyNumber: number;
}

export interface Coordinates {
  x: number;
  y: number;
}