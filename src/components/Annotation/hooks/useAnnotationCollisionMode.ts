import { useEffect } from "react";

const useAnnotationCollisionMode = (
  annotation: mapkit.Annotation | null,
  collisionMode: string | undefined
) => {
  useEffect(() => {
    if (!annotation) return;

    if (collisionMode === "Circle") {
      annotation.collisionMode = mapkit.Annotation.CollisionMode.Circle;
    } else if (collisionMode === "Rectangle") {
      annotation.collisionMode = mapkit.Annotation.CollisionMode.Rectangle;
    } else {
      delete annotation.collisionMode;
    }
  }, [annotation, collisionMode]);
};

export default useAnnotationCollisionMode;