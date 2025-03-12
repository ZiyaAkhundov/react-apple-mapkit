import { useEffect } from "react";

const useMarkerCollisionMode = (
  marker: mapkit.MarkerAnnotation | null,
  collisionMode: string | undefined
) => {
  useEffect(() => {
    if (!marker) return;

    if (collisionMode === "Circle") {
      marker.collisionMode = mapkit.Annotation.CollisionMode.Circle;
    } else if (collisionMode === "Rectangle") {
      marker.collisionMode = mapkit.Annotation.CollisionMode.Rectangle;
    } else {
      delete marker.collisionMode;
    }
  }, [marker, collisionMode]);
};

export default useMarkerCollisionMode;