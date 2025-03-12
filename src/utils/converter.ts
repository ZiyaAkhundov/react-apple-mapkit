import { CoordinateRegion } from "../types/map-types";

export const generateRegion = (region: mapkit.CoordinateRegion): CoordinateRegion =>  {
  return {
    centerLatitude: region.center.latitude,
    centerLongitude: region.center.longitude,
    latitudeDelta: region.span.latitudeDelta,
    longitudeDelta: region.span.longitudeDelta,
  };
}

export const toMapCoordinateRegion = (region: CoordinateRegion) : mapkit.CoordinateRegion => {
  return new mapkit.CoordinateRegion(
    new mapkit.Coordinate(region.centerLatitude, region.centerLongitude),
    new mapkit.CoordinateSpan(region.latitudeDelta, region.longitudeDelta),
  );
}
