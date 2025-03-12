import { FeatureVisibility } from "../enums";

export const toMapFeatureVisibility = (featureVisibility: FeatureVisibility): mapkit.Map.FeatureVisibility => {
  switch (featureVisibility) {
    case FeatureVisibility.Adaptive:
      return mapkit.FeatureVisibility.Adaptive;
    case FeatureVisibility.Visible:
      return mapkit.FeatureVisibility.Visible;
    case FeatureVisibility.Hidden:
      return mapkit.FeatureVisibility.Hidden;
    default:
      throw new RangeError('Invalid visibility');
  }
}