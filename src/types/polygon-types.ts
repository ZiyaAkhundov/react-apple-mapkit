import { ReactNode } from "react";

// Coordinate type reused from map-types.ts if applicable
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Updated PolygonProps to support nested arrays of coordinates
export interface PolygonProps {
  points: (Coordinate | Coordinate[])[];   // Allow points to be Coordinate or an array of Coordinates
  fillColor?: string;                     // Optional: Fill color for the polygon
  strokeColor?: string;                   // Optional: Stroke color for the polygon
  lineWidth?: number;                     // Optional: Width of the polygon border

  // Event handlers
  onSelect?: () => void;                  // Triggered when the polygon is selected
  onDeselect?: () => void;                // Triggered when the polygon is deselected

  children?: ReactNode;                   // Optional children elements
}
