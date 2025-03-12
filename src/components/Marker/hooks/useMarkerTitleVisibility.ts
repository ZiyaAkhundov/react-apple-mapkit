import { useEffect } from "react";
import { FeatureVisibility } from "../../../enums";
import { toMapFeatureVisibility } from "../../../utils/map-feature-visibility";

const useMarkerTitleVisibility = (
  marker: mapkit.MarkerAnnotation | null,
  titleVisibility: FeatureVisibility,
  subtitleVisibility: FeatureVisibility
) => {
  useEffect(() => {
    if (!marker) return;
    marker.subtitleVisibility = toMapFeatureVisibility(subtitleVisibility);
  }, [marker, subtitleVisibility]);

  useEffect(() => {
    if (!marker) return;
    marker.titleVisibility = toMapFeatureVisibility(titleVisibility);
  }, [marker, titleVisibility]);
};

export default useMarkerTitleVisibility;
