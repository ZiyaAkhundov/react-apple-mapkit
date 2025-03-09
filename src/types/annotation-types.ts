import { ReactNode } from "react";

// Coordinate type reused from map-types.ts if applicable
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Annotation props type
export interface AnnotationProps {
  latitude: number;                      // Required
  longitude: number;                     // Required
  size?: { width: number; height: number };
  title?: string;
  subtitle?: string;
  accessibilityLabel?: string;
  anchorOffsetX?: number;
  anchorOffsetY?: number;
  selected?: boolean;
  animates?: boolean;
  appearanceAnimation?: string;
  draggable?: boolean;
  enabled?: boolean;
  visible?: boolean;
  clusteringIdentifier?: string;
  collisionMode?: "Rectangle" | "Circle" | "None";
  displayPriority?: number | "low" | "high" | "required";
  calloutOffsetX?: number;
  calloutOffsetY?: number;
  calloutEnabled?: boolean;
  calloutLeftAccessory?: ReactNode;
  calloutRightAccessory?: ReactNode;
  calloutContent?: ReactNode;
  calloutElement?: ReactNode;
  children?: ReactNode;

  // Event handlers
  onSelect?: () => void;
  onDeselect?: () => void;
  onDragStart?: () => void;
  onDragEnd?: (newPosition: Coordinate) => void;
  onDragging?: (newPosition: Coordinate) => void;
}
