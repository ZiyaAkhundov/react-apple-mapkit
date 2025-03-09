import { ReactNode } from "react";

// Coordinate type reused from map-types.ts if applicable
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Polyline props type
export interface PolylineProps {
  points: Coordinate[];               // Required: Array of coordinates for the polyline
  strokeColor?: string;               // Optional: Stroke color for the polyline
  lineWidth?: number;                 // Optional: Width of the polyline
  lineDash?: number[];                // Optional: Dash pattern for the line (e.g., [15, 5])
  lineCap?: "butt" | "round" | "square";  // Optional: Line cap style

  // Event handlers
  onSelect?: () => void;              // Triggered when the polyline is selected
  onDeselect?: () => void;            // Triggered when the polyline is deselected

  children?: ReactNode;               // Optional children elements
}
