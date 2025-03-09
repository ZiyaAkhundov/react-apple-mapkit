import { ReactNode } from "react";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Marker props type
export interface MarkerProps {
  latitude: number;                      // Required
  longitude: number;                     // Required
  title?: string;
  subtitle?: string;
  draggable?: boolean;
  selected?: boolean;
  visible?: boolean;
  color?: string;                        // Marker color (optional)
  glyphText?: string;                    // Text to display on the marker (optional)
  glyphImage?: string;                   // URL to an image for the marker (optional)
  displayPriority?: number | "low" | "high" | "required";

  // Event handlers
  onSelect?: () => void;
  onDeselect?: () => void;
  onDragStart?: () => void;
  onDragEnd?: (newPosition: Coordinate) => void;
  onDragging?: (newPosition: Coordinate) => void;

  children?: ReactNode;
}
