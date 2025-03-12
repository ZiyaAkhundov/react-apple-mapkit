import { useEffect } from "react";

const useMapBooleanProperties = (
  map: mapkit.Map | null,
  properties: { [key: string]: boolean }
) => {
  Object.entries(properties).forEach(([propertyName, prop]) => {
    useEffect(() => {
      if (!map) return;
      map[propertyName] = prop;
    }, [map, prop]);
  });
};

export default useMapBooleanProperties;