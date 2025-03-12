import { useEffect } from "react";

const useMapCameraZoomRange = (
  map: mapkit.Map | null,
  minCameraDistance: number,
  maxCameraDistance: number
) => {
  useEffect(() => {
    if (!map) return;
    map.cameraZoomRange = new mapkit.CameraZoomRange(
      minCameraDistance,
      maxCameraDistance
    );
  }, [map, minCameraDistance, maxCameraDistance]);
};

export default useMapCameraZoomRange;