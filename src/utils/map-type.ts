import { MapType } from "../enums";

export const convertFromMapType = (mapType: string): MapType => {
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

export const convertToMapType = (mapType: MapType): mapkit.Map.MapTypes => {
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