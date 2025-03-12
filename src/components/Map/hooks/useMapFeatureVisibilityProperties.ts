import { useEffect } from "react";
import { FeatureVisibility } from "../../../enums";
import { toMapFeatureVisibility } from "../../../utils/map-feature-visibility";

const useMapFeatureVisibilityProperties = (
  map: mapkit.Map | null,
  properties: { [key: string]: FeatureVisibility }
) => {
  Object.entries(properties).forEach(([propertyName, prop]) => {
    useEffect(() => {
      if (!map) return;
      map[propertyName] = toMapFeatureVisibility(prop);
    }, [map, prop]);
  });
};

export default useMapFeatureVisibilityProperties;