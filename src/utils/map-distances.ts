import { Distances } from "../enums";

export const toMapDistances = (distances: Distances): mapkit.Map.Distances  => {
  switch (distances) {
    case Distances.Adaptive:
      return mapkit.Map.Distances.Adaptive;
    case Distances.Metric:
      return mapkit.Map.Distances.Metric;
    case Distances.Imperial:
      return mapkit.Map.Distances.Imperial;
    default:
      throw new RangeError('Invalid distance');
  }
}