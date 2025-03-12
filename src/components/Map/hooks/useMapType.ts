import { useEffect } from "react";
import { MapType } from "../../../enums";
import { convertToMapType } from "../../../utils/map-type";

const useMapType = (map: mapkit.Map | null, mapType: MapType) => {
  useEffect(() => {
    if (!map) return;
    map.mapType = convertToMapType(mapType);
  }, [map, mapType]);
};

export default useMapType;