import { useEffect } from "react";

const useAnnotationAnchorOffset = (
  annotation: mapkit.Annotation | null,
  anchorOffsetX: number,
  anchorOffsetY: number
) => {
  useEffect(() => {
    if (!annotation) return;
    annotation.anchorOffset = new DOMPoint(anchorOffsetX, anchorOffsetY);
  }, [annotation, anchorOffsetX, anchorOffsetY]);
};

export default useAnnotationAnchorOffset;