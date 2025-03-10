import { ReactNode } from "react";
import { FeatureVisibility } from "../enums";
import { Coordinate } from "./map-types";

export default interface MarkerProps {
    latitude: number;
    longitude: number;
    title?: string;
    subtitle?: string;
    accessibilityLabel?: string | null;
    subtitleVisibility?: FeatureVisibility;
    titleVisibility?: FeatureVisibility;
    color?: string;
    glyphColor?: string;
    glyphText?: string;
    glyphImage?: object | null;
    selectedGlyphImage?: object | null;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    anchorOffsetX?: number;
    anchorOffsetY?: number;
    selected?: boolean;
    animates?: boolean;
    appearanceAnimation?: string;
    draggable?: boolean;
    enabled?: boolean;
    visible?: boolean;
    onSelect?: () => void;
    onDeselect?: () => void;
    onDragStart?: () => void;
    onDragEnd?: (newPosition: Coordinate) => void;
    onDragging?: (newPosition: Coordinate) => void;
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