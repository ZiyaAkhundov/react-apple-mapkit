import { useEffect } from "react";

const useMarkerProperties = (
  marker: mapkit.MarkerAnnotation | null,
  properties: { [key: string]: any }
) => {
  Object.entries(properties).forEach(([propertyName, prop]) => {
    useEffect(() => {
      if (!marker) return;
      if (prop === undefined) {
        delete marker[propertyName];
        return;
      }
      marker[propertyName] = prop;
    }, [marker, prop]);
  });
};

export default useMarkerProperties;