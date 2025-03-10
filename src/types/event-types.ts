import { Coordinate } from "./map-types";

export interface MapInteractionEvent {
    readonly pointOnPage: { x: number, y: number };
    readonly domEvents: Event[];
    toCoordinates(): Coordinate;
  }
  
  export interface UserLocationChangeEvent {
    coordinate: Coordinate;
    timestamp: Date;
    floorLevel: number | undefined | null;
  }

  export enum UserLocationError {
    PERMISSION_DENIED = 1,
    POSITION_UNAVAILABLE = 2,
    TIMEOUT = 3,
    MAPKIT_NOT_INITIALIZED = 4,
  }
  
  export interface UserLocationErrorEvent {
    code: UserLocationError;
    message: String;
  }

  export type MapKitMapInteractionEvent = {
    domEvents: Event[],
    pointOnPage: DOMPoint,
  };

  export type MapKitUserLocationChangeEvent = {
    coordinate: mapkit.Coordinate,
    timestamp: Date,
    floorLevel: number | undefined | null,
  };

  export type MapKitUserLocationErrorEvent = {
    code: 1 | 2 | 3 | 4,
    message: string,
  };