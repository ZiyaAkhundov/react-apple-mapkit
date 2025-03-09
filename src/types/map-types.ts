export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface CoordinateRegion {
  center: Coordinate;
  span: {
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export interface MapInteractionEvent {
  latitude: number;
  longitude: number;
  x: number;
  y: number;
}

export interface UserLocationErrorEvent {
  code: number;
  message: string;
}

export type MapType = "standard" | "hybrid" | "satellite";
export type ColorScheme = "dark" | "light" | "auto";
export type Distances = "metric" | "imperial";

export interface MapProps {
  initialRegion: CoordinateRegion;  // Required initial region
  zoomLevel?: number;               // Optional zoom level
  mapType?: MapType;
  colorScheme?: ColorScheme;
  distances?: Distances;

  isRotationEnabled?: boolean;
  isScrollEnabled?: boolean;
  isZoomEnabled?: boolean;

  showsCompass?: boolean;
  showsScale?: boolean;
  showsMapTypeControl?: boolean;
  showsZoomControl?: boolean;
  showsUserLocationControl?: boolean;
  tracksUserLocation?: boolean;
  showUserLocation?: boolean;

  onLoad?: () => void;
  onRegionChangeStart?: (currentValue: CoordinateRegion) => void;
  onRegionChangeEnd?: (newValue: CoordinateRegion) => void;
  onMapTypeChange?: (newValue: MapType) => void;
  onSingleTap?: (event: MapInteractionEvent) => void;
  onDoubleTap?: (event: MapInteractionEvent) => void;
  onLongPress?: (event: MapInteractionEvent) => void;
  onClick?: (event: MapInteractionEvent) => void;
  onMouseMove?: (event: MapInteractionEvent) => void;
  onMouseDown?: (event: MapInteractionEvent) => void;
  onMouseUp?: (event: MapInteractionEvent) => void;
  onUserLocationChange?: (location: Coordinate) => void;
  onUserLocationError?: (event: UserLocationErrorEvent) => void;

  children?: React.ReactNode;
}