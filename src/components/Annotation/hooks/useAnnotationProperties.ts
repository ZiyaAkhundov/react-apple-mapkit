import { useEffect } from "react";

const useAnnotationProperties = (
  annotation: mapkit.Annotation | null,
  properties: { [key: string]: any }
) => {
  Object.entries(properties).forEach(([propertyName, prop]) => {
    useEffect(() => {
      if (!annotation) return;
      if (prop === undefined) {
        delete annotation[propertyName];
        return;
      }
      annotation[propertyName] = prop;
    }, [annotation, prop]);
  });
};

export default useAnnotationProperties;