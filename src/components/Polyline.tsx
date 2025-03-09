import  React from "react";
import { useEffect, useRef, useContext } from "react";
import { PolylineProps } from "../types/polyline-types";
import { MapContext } from "../contexts/MapContext";

const Polyline: React.FC<PolylineProps> = ({
  points,
  strokeColor = "#000000", // Default stroke color: Black
  lineWidth = 2, // Default line width: 2
  lineDash = [], // Default no dash pattern
  lineCap = "round", // Default line cap: round
  onSelect,
  onDeselect,
  children,
}) => {
  const polylineRef = useRef<mapkit.PolylineOverlay | null>(null);
  const map = useContext(MapContext);

  useEffect(() => {
    if (!window.mapkit || !map) return;

    // Convert points to mapkit.Coordinate objects
    const coordinates = points.map(
      (point) => new window.mapkit.Coordinate(point.latitude, point.longitude)
    );

    // Create a new polyline with specified options
    const polyline = new window.mapkit.PolylineOverlay(coordinates, {
      strokeColor,
      lineWidth,
      lineDash,
      lineCap,
    });
    polylineRef.current = polyline;

    map.addOverlay(polyline);

    // Event handlers
    const handleSelect = () => onSelect?.();
    const handleDeselect = () => onDeselect?.();

    polyline.addEventListener("select", handleSelect as EventListener);
    polyline.addEventListener("deselect", handleDeselect as EventListener);

    return () => {
      if (polylineRef.current) {
        polyline.removeEventListener("select", handleSelect as EventListener);
        polyline.removeEventListener(
          "deselect",
          handleDeselect as EventListener
        );
        map.removeOverlay(polylineRef.current);
        polylineRef.current = null;
      }
    };
  }, [
    map,
    points,
    strokeColor,
    lineWidth,
    lineDash,
    lineCap,
    onSelect,
    onDeselect,
  ]);

  return <>{children}</>;
};

export default Polyline;
