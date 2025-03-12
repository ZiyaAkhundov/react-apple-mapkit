import { useEffect } from "react";

const useMapPadding = (
  map: mapkit.Map | null,
  paddingTop: number,
  paddingRight: number,
  paddingBottom: number,
  paddingLeft: number
) => {
  useEffect(() => {
    if (!map) return;
    map.padding = new mapkit.Padding(
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    );
  }, [map, paddingTop, paddingRight, paddingBottom, paddingLeft]);
};

export default useMapPadding;