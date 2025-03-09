import React, { useEffect, useRef, useContext } from "react";
import { Coordinate, PolygonProps } from "../types/polygon-types";
import  MapContext  from "../contexts/MapContext";

const Polygon: React.FC<PolygonProps> = ({
  points,
  fillColor = "#FF0000", // Default fill color: Red
  strokeColor = "#000000", // Default stroke color: Black
  lineWidth = 2, // Default line width: 2
  onSelect,
  onDeselect,
  children,
}) => {
  const polygonRef = useRef<mapkit.PolygonOverlay | null>(null);
  const map = useContext(MapContext);

  useEffect(() => {
    if (!window.mapkit || !map) return;

    // Flatten nested points array
    const flattenedPoints: Coordinate[] = points.flatMap((point) =>
      Array.isArray(point) ? point : [point]
    );

    // Convert points to mapkit.Coordinate objects
    const coordinates = flattenedPoints.map(
      (point) => new window.mapkit.Coordinate(point.latitude, point.longitude)
    );

    // Create a new polygon without using style property
    const polygon = new window.mapkit.PolygonOverlay(coordinates, {
      fillColor, // Directly use fillColor
      strokeColor, // Directly use strokeColor
      lineWidth, // Directly use lineWidth
    });
    polygonRef.current = polygon;

    map.addOverlay(polygon);

    // Event handlers
    const handleSelect = () => onSelect?.();
    const handleDeselect = () => onDeselect?.();

    polygon.addEventListener("select", handleSelect as EventListener);
    polygon.addEventListener("deselect", handleDeselect as EventListener);

    return () => {
      if (polygonRef.current) {
        polygon.removeEventListener("select", handleSelect as EventListener);
        polygon.removeEventListener(
          "deselect",
          handleDeselect as EventListener
        );
        map.removeOverlay(polygonRef.current);
        polygonRef.current = null;
      }
    };
  }, [map, points, fillColor, strokeColor, lineWidth, onSelect, onDeselect]);

  return <>{children}</>;
};

export default Polygon;
