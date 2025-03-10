import { Distances, FeatureVisibility, MapType, PointOfInterestCategory } from "../enums";
import { MapInteractionEvent, UserLocationChangeEvent, UserLocationErrorEvent } from "./event-types";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface CoordinateRegion {
  centerLatitude: number;
  centerLongitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}


export default interface MapProps {
  load?: (token: string) => Promise<void>;
  token: string;
  mapType?: MapType;
  distances?: Distances;
  isRotationEnabled?: boolean;
  isScrollEnabled?: boolean;
  isZoomEnabled?: boolean;
  showsCompass?: FeatureVisibility;
  showsScale?: FeatureVisibility;
  showsMapTypeControl?: boolean;
  showsZoomControl?: boolean;
  showsUserLocationControl?: boolean;
  showsPointsOfInterest?: boolean;
  showsUserLocation?: boolean;
  tracksUserLocation?: boolean;
  includedPOICategories?: PointOfInterestCategory[];
  excludedPOICategories?: PointOfInterestCategory[];
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  initialRegion?: CoordinateRegion;
  cameraBoundary?: CoordinateRegion;
  minCameraDistance?: number;
  maxCameraDistance?: number;
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
  onUserLocationChange?: (event: UserLocationChangeEvent) => void;
  onUserLocationError?: (event: UserLocationErrorEvent) => void;
}
