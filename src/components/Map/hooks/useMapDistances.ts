import { useEffect } from "react";
import { Distances } from "../../../enums";
import { toMapDistances } from "../../../utils/map-distances";

const useMapDistances = (map: mapkit.Map | null, distances: Distances) => {
  useEffect(() => {
    if (!map) return;
    map.distances = toMapDistances(distances);
  }, [map, distances]);
};

export default useMapDistances;