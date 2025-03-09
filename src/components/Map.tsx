import React, { useEffect, useRef, useState } from "react";
import { 
  MapProps, 
} from "../types/map-types";
import { MapContext } from "../contexts/MapContext";

const Map: React.FC<MapProps> = ({
  initialRegion,
  zoomLevel = 10,
  mapType = "standard",
  colorScheme = "auto",
  distances = "metric",

  isRotationEnabled = true,
  isScrollEnabled = true,
  isZoomEnabled = true,

  showsCompass = false,
  showsScale = false,
  showsMapTypeControl = false,
  showsZoomControl = false,
  showsUserLocationControl = false,
  tracksUserLocation = false,
  showUserLocation = false,

  onLoad,
  onRegionChangeStart,
  onRegionChangeEnd,
  onMapTypeChange,
  onSingleTap,
  onDoubleTap,
  onLongPress,
  onClick,
  onMouseMove,
  onMouseDown,
  onMouseUp,
  onUserLocationChange,
  onUserLocationError,
  children,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapkit.Map | null>(null);

  useEffect(() => {
    if (window.mapkit && mapRef.current) {
      const newMap = new window.mapkit.Map(mapRef.current);

      // Apply map options
      newMap.mapType = mapkit.Map.MapTypes[mapType.toUpperCase() as keyof typeof mapkit.Map.MapTypes];
      newMap.colorScheme = mapkit.Map.ColorSchemes[colorScheme.toUpperCase() as keyof typeof mapkit.Map.ColorSchemes];
      newMap.distances = mapkit.Map.Distances[distances.toUpperCase() as keyof typeof mapkit.Map.Distances];
      newMap.showsUserLocation = showUserLocation;
      newMap.isRotationEnabled = isRotationEnabled;
      newMap.isScrollEnabled = isScrollEnabled;
      newMap.isZoomEnabled = isZoomEnabled;

      newMap.showsCompass = showsCompass;
      newMap.showsScale = showsScale;
      newMap.showsMapTypeControl = showsMapTypeControl;
      newMap.showsZoomControl = showsZoomControl;
      newMap.showsUserLocationControl = showsUserLocationControl;
      newMap.tracksUserLocation = tracksUserLocation;

      // Handle initial region and zoom level
      const spanDelta = 0.1 / Math.pow(2, zoomLevel - 10);
      newMap.region = new mapkit.CoordinateRegion(
        new mapkit.Coordinate(initialRegion.center.latitude, initialRegion.center.longitude),
        new mapkit.CoordinateSpan(spanDelta, spanDelta)
      );

      // Event listeners
      const eventListeners: Array<[string, ((event: any) => void) | undefined]> = [
        ["load", onLoad ? () => onLoad?.() : undefined],
        ["region-change-start", onRegionChangeStart ? (event) => onRegionChangeStart?.(event.region) : undefined],
        ["region-change-end", onRegionChangeEnd ? (event) => onRegionChangeEnd?.(event.region) : undefined],
        ["map-type-change", onMapTypeChange ? (event) => onMapTypeChange?.(event.mapType) : undefined],
        ["single-tap", onSingleTap],
        ["double-tap", onDoubleTap],
        ["long-press", onLongPress],
        ["click", onClick],
        ["mousemove", onMouseMove],
        ["mousedown", onMouseDown],
        ["mouseup", onMouseUp],
        ["user-location-change", onUserLocationChange ? (event) => onUserLocationChange?.(event.coordinate) : undefined],
        ["user-location-error", onUserLocationError]
      ];

      // Attach event listeners if handlers are provided
      eventListeners.forEach(([event, handler]) => {
        if (handler) newMap.addEventListener(event, handler);
      });

      setMap(newMap);

      return () => {
        // Cleanup event listeners and destroy map instance
        eventListeners.forEach(([event, handler]) => {
          if (handler) newMap.removeEventListener(event, handler);
        });
        newMap.destroy();
      };
    }
  }, [
    initialRegion,
    mapType,
    showUserLocation,
    isRotationEnabled,
    isScrollEnabled,
    isZoomEnabled,
    showsCompass,
    showsScale,
    showsMapTypeControl,
    showsZoomControl,
    showsUserLocationControl,
    tracksUserLocation,
    colorScheme,
    distances,
    zoomLevel,
  ]);

  return (
    <MapContext.Provider value={map}>
    <div style={{ position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
      {children}
    </div>
    </MapContext.Provider>
  );
};

export default Map;
