import {
  Distances,
  FeatureVisibility,
  MapType,
  PointOfInterestCategory,
} from "../enums";
import { CoordinateRegion } from "../types/map-types";

export function toMapKitMapType(mapType: MapType): mapkit.Map.MapTypes {
  switch (mapType) {
    case MapType.Standard:
      return mapkit.Map.MapTypes.Standard;
    case MapType.MutedStandard:
      return mapkit.Map.MapTypes.MutedStandard;
    case MapType.Hybrid:
      return mapkit.Map.MapTypes.Hybrid;
    case MapType.Satellite:
      return mapkit.Map.MapTypes.Satellite;
    default:
      throw new RangeError('Invalid map type');
  }
}


export function fromMapKitRegion(region: mapkit.CoordinateRegion): CoordinateRegion {
  return {
    centerLatitude: region.center.latitude,
    centerLongitude: region.center.longitude,
    latitudeDelta: region.span.latitudeDelta,
    longitudeDelta: region.span.longitudeDelta,
  };
}

export function fromMapKitMapType(mapType: string): MapType {
  switch (mapType) {
    case mapkit.Map.MapTypes.Standard:
      return MapType.Standard;
    case mapkit.Map.MapTypes.MutedStandard:
      return MapType.MutedStandard;
    case mapkit.Map.MapTypes.Hybrid:
      return MapType.Hybrid;
    case mapkit.Map.MapTypes.Satellite:
      return MapType.Satellite;
    default:
      throw new RangeError('Invalid map type');
  }
}

export function toMapKitDistances(distances: Distances): mapkit.Map.Distances {
  switch (distances) {
    case Distances.Adaptive:
      return mapkit.Map.Distances.Adaptive;
    case Distances.Metric:
      return mapkit.Map.Distances.Metric;
    case Distances.Imperial:
      return mapkit.Map.Distances.Imperial;
    default:
      throw new RangeError('Invalid distances value');
  }
}

export function toMapKitFeatureVisibility(featureVisibility: FeatureVisibility): mapkit.Map.FeatureVisibility {
  switch (featureVisibility) {
    case FeatureVisibility.Adaptive:
      return mapkit.FeatureVisibility.Adaptive;
    case FeatureVisibility.Visible:
      return mapkit.FeatureVisibility.Visible;
    case FeatureVisibility.Hidden:
      return mapkit.FeatureVisibility.Hidden;
    default:
      throw new RangeError('Invalid feature visibility');
  }
}

export function toMapKitPOICategory(category: PointOfInterestCategory):
mapkit.PointOfInterestCategory {
  switch (category) {
    case PointOfInterestCategory.Airport:
      return mapkit.PointOfInterestCategory.Airport;
    case PointOfInterestCategory.AmusementPark:
      return mapkit.PointOfInterestCategory.AmusementPark;
    case PointOfInterestCategory.Aquarium:
      return mapkit.PointOfInterestCategory.Aquarium;
    case PointOfInterestCategory.ATM:
      return mapkit.PointOfInterestCategory.ATM;
    case PointOfInterestCategory.Bakery:
      return mapkit.PointOfInterestCategory.Bakery;
    case PointOfInterestCategory.Bank:
      return mapkit.PointOfInterestCategory.Bank;
    case PointOfInterestCategory.Beach:
      return mapkit.PointOfInterestCategory.Beach;
    case PointOfInterestCategory.Brewery:
      return mapkit.PointOfInterestCategory.Brewery;
    case PointOfInterestCategory.Cafe:
      return mapkit.PointOfInterestCategory.Cafe;
    case PointOfInterestCategory.Campground:
      return mapkit.PointOfInterestCategory.Campground;
    case PointOfInterestCategory.CarRental:
      return mapkit.PointOfInterestCategory.CarRental;
    case PointOfInterestCategory.EVCharger:
      return mapkit.PointOfInterestCategory.EVCharger;
    case PointOfInterestCategory.FireStation:
      return mapkit.PointOfInterestCategory.FireStation;
    case PointOfInterestCategory.FitnessCenter:
      return mapkit.PointOfInterestCategory.FitnessCenter;
    case PointOfInterestCategory.FoodMarket:
      return mapkit.PointOfInterestCategory.FoodMarket;
    case PointOfInterestCategory.GasStation:
      return mapkit.PointOfInterestCategory.GasStation;
    case PointOfInterestCategory.Hospital:
      return mapkit.PointOfInterestCategory.Hospital;
    case PointOfInterestCategory.Hotel:
      return mapkit.PointOfInterestCategory.Hotel;
    case PointOfInterestCategory.Laundry:
      return mapkit.PointOfInterestCategory.Laundry;
    case PointOfInterestCategory.Library:
      return mapkit.PointOfInterestCategory.Library;
    case PointOfInterestCategory.Marina:
      return mapkit.PointOfInterestCategory.Marina;
    case PointOfInterestCategory.MovieTheater:
      return mapkit.PointOfInterestCategory.MovieTheater;
    case PointOfInterestCategory.Museum:
      return mapkit.PointOfInterestCategory.Museum;
    case PointOfInterestCategory.NationalPark:
      return mapkit.PointOfInterestCategory.NationalPark;
    case PointOfInterestCategory.Nightlife:
      return mapkit.PointOfInterestCategory.Nightlife;
    case PointOfInterestCategory.Park:
      return mapkit.PointOfInterestCategory.Park;
    case PointOfInterestCategory.Parking:
      return mapkit.PointOfInterestCategory.Parking;
    case PointOfInterestCategory.Pharmacy:
      return mapkit.PointOfInterestCategory.Pharmacy;
    case PointOfInterestCategory.Police:
      return mapkit.PointOfInterestCategory.Police;
    case PointOfInterestCategory.PostOffice:
      return mapkit.PointOfInterestCategory.PostOffice;
    case PointOfInterestCategory.PublicTransport:
      return mapkit.PointOfInterestCategory.PublicTransport;
    case PointOfInterestCategory.Restaurant:
      return mapkit.PointOfInterestCategory.Restaurant;
    case PointOfInterestCategory.Restroom:
      return mapkit.PointOfInterestCategory.Restroom;
    case PointOfInterestCategory.School:
      return mapkit.PointOfInterestCategory.School;
    case PointOfInterestCategory.Stadium:
      return mapkit.PointOfInterestCategory.Stadium;
    case PointOfInterestCategory.Store:
      return mapkit.PointOfInterestCategory.Store;
    case PointOfInterestCategory.Theater:
      return mapkit.PointOfInterestCategory.Theater;
    case PointOfInterestCategory.University:
      return mapkit.PointOfInterestCategory.University;
    case PointOfInterestCategory.Winery:
      return mapkit.PointOfInterestCategory.Winery;
    case PointOfInterestCategory.Zoo:
      return mapkit.PointOfInterestCategory.Zoo;
    default:
      throw new RangeError('Invalid point of interest category');
  }
}


export function toMapKitCoordinateRegion(region: CoordinateRegion) : mapkit.CoordinateRegion {
  return new mapkit.CoordinateRegion(
    new mapkit.Coordinate(region.centerLatitude, region.centerLongitude),
    new mapkit.CoordinateSpan(region.latitudeDelta, region.longitudeDelta),
  );
}
