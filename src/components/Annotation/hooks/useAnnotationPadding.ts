import { useEffect } from "react";

const useAnnotationPadding = (
  annotation: mapkit.Annotation | null,
  paddingTop: number,
  paddingRight: number,
  paddingBottom: number,
  paddingLeft: number
) => {
  useEffect(() => {
    if (!annotation) return;
    annotation.padding = new mapkit.Padding(
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    );
  }, [annotation, paddingTop, paddingRight, paddingBottom, paddingLeft]);
};

export default useAnnotationPadding;