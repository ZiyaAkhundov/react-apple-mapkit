import { ReactNode } from 'react';
import { Coordinate } from './map-types';

export default interface AnnotationProps {
  latitude: number;
  longitude: number;
  title?: string;
  subtitle?: string;
  accessibilityLabel?: string | null;
  size?: { width: number; height: number };
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  anchorOffsetX?: number;
  anchorOffsetY?: number;
  selected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  onDragStart?: () => void;
  onDragEnd?: (newPosition: Coordinate) => void;
  onDragging?: (newPosition: Coordinate) => void;
  animates?: boolean;
  appearanceAnimation?: string;
  draggable?: boolean;
  enabled?: boolean;
  visible?: boolean;
  children?: React.ReactNode;
  clusteringIdentifier?: string | null;
  collisionMode?: 'Rectangle' | 'Circle' | null;
  calloutOffsetX?: number;
  calloutOffsetY?: number;
  calloutEnabled?: boolean;
  calloutLeftAccessory?: ReactNode;
  calloutRightAccessory?: ReactNode;
  calloutContent?: ReactNode;
  calloutElement?: ReactNode;
}