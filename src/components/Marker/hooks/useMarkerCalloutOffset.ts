import { useEffect } from "react";

const useMarkerCalloutOffset = (
  marker: mapkit.MarkerAnnotation | null,
  calloutOffsetX: number,
  calloutOffsetY: number
) => {
  useEffect(() => {
    if (!marker) return;
    marker.calloutOffset = new DOMPoint(calloutOffsetX, calloutOffsetY);
  }, [marker, calloutOffsetX, calloutOffsetY]);
};

export default useMarkerCalloutOffset;