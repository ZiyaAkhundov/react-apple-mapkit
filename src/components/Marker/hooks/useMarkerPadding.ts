import { useEffect } from "react";

const useMarkerPadding = (
  marker: mapkit.MarkerAnnotation | null,
  paddingTop: number,
  paddingRight: number,
  paddingBottom: number,
  paddingLeft: number
) => {
  useEffect(() => {
    if (!marker) return;
    marker.padding = new mapkit.Padding(
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    );
  }, [marker, paddingTop, paddingRight, paddingBottom, paddingLeft]);
};

export default useMarkerPadding;