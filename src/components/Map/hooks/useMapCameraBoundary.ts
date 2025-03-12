import { useEffect } from "react";
import { toMapCoordinateRegion } from "../../../utils/converter";
import { CoordinateRegion } from "../../../types/map-types";

const useMapCameraBoundary = (
  map: mapkit.Map | null,
  cameraBoundary: CoordinateRegion
) => {
  useEffect(() => {
    if (!map) return;
    map.cameraBoundary = cameraBoundary
      ? toMapCoordinateRegion(cameraBoundary)
      : null;
  }, [map, cameraBoundary]);
};

export default useMapCameraBoundary;