import { useEffect } from "react";
import { PointOfInterestCategory } from "../../../enums";
import { toMapPOICategory } from "../../../utils/map-pointer-of-intersection";

const useMapPointOfInterestFilter = (
  map: mapkit.Map | null,
  includedPOICategories: PointOfInterestCategory[] | undefined,
  excludedPOICategories:  PointOfInterestCategory[] | undefined
) => {
  useEffect(() => {
    if (!map) return;

    if (includedPOICategories && excludedPOICategories) {
      throw new Error(
        "Can’t specify both includedPOICategories and excludedPOICategories."
      );
    } else if (includedPOICategories) {
      map.pointOfInterestFilter = mapkit.PointOfInterestFilter.including(
        includedPOICategories.map(toMapPOICategory)
      );
    } else if (excludedPOICategories) {
      map.pointOfInterestFilter = mapkit.PointOfInterestFilter.excluding(
        excludedPOICategories.map(toMapPOICategory)
      );
    } else {
      delete map.pointOfInterestFilter;
    }
  }, [map, includedPOICategories, excludedPOICategories]);
};

export default useMapPointOfInterestFilter;