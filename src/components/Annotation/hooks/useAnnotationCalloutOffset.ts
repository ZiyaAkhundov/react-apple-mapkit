import { useEffect } from "react";

const useAnnotationCalloutOffset = (
  annotation: mapkit.Annotation | null,
  calloutOffsetX: number,
  calloutOffsetY: number
) => {
  useEffect(() => {
    if (!annotation) return;
    annotation.calloutOffset = new DOMPoint(calloutOffsetX, calloutOffsetY);
  }, [annotation, calloutOffsetX, calloutOffsetY]);
};

export default useAnnotationCalloutOffset;