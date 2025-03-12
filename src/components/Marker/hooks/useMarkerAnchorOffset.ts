import { useEffect } from "react";

const useMarkerAnchorOffset = (
  marker: mapkit.MarkerAnnotation | null,
  anchorOffsetX: number,
  anchorOffsetY: number
) => {
  useEffect(() => {
    if (!marker) return;
    marker.anchorOffset = new DOMPoint(anchorOffsetX, anchorOffsetY);
  }, [marker, anchorOffsetX, anchorOffsetY]);
};

export default useMarkerAnchorOffset;