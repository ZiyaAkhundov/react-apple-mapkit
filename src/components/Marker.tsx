import React, { useEffect, useRef, useContext } from "react";
import { MarkerProps } from "../types/marker-types";
import  MapContext  from "../contexts/MapContext";  // Access the map instance from context

const Marker: React.FC<MarkerProps> = ({
  latitude,
  longitude,
  title,
  subtitle,
  draggable = false,
  selected = false,
  visible = true,
  color = "#ff0000",  // Default color: Red
  glyphText,
  glyphImage,
  displayPriority = 500,
  onSelect,
  onDeselect,
  onDragStart,
  onDragEnd,
  onDragging,
  children,
}) => {
  const markerRef = useRef<mapkit.MarkerAnnotation | null>(null);
  const map = useContext(MapContext);

  useEffect(() => {
    if (!window.mapkit || !map) return;

    const coordinate = new window.mapkit.Coordinate(latitude, longitude);
    const marker = new window.mapkit.MarkerAnnotation(coordinate, {
      title,
      subtitle,
      draggable,
      selected,
      visible,
      color,
      glyphText,
      glyphImage,
      displayPriority,
    });
    markerRef.current = marker;

    map.addAnnotation(marker);

    // Event handlers with type assertion for Event
    const handleSelect = () => onSelect?.();
    const handleDeselect = () => onDeselect?.();
    const handleDragStart = () => onDragStart?.();
    const handleDragEnd = (event: Event) => {
      const customEvent = event as mapkit.AnnotationEvent;
      onDragEnd?.(customEvent.coordinate);
    };
    const handleDragging = (event: Event) => {
      const customEvent = event as mapkit.AnnotationEvent;
      onDragging?.(customEvent.coordinate);
    };

    marker.addEventListener("select", handleSelect as EventListener);
    marker.addEventListener("deselect", handleDeselect as EventListener);
    marker.addEventListener("drag-start", handleDragStart as EventListener);
    marker.addEventListener("drag-end", handleDragEnd as EventListener);
    marker.addEventListener("dragging", handleDragging as EventListener);

    return () => {
      if (markerRef.current) {
        marker.removeEventListener("select", handleSelect as EventListener);
        marker.removeEventListener("deselect", handleDeselect as EventListener);
        marker.removeEventListener("drag-start", handleDragStart as EventListener);
        marker.removeEventListener("drag-end", handleDragEnd as EventListener);
        marker.removeEventListener("dragging", handleDragging as EventListener);
        map.removeAnnotation(markerRef.current);
        markerRef.current = null;
      }
    };
  }, [
    map,
    latitude,
    longitude,
    title,
    subtitle,
    draggable,
    selected,
    visible,
    color,
    glyphText,
    glyphImage,
    displayPriority,
    onSelect,
    onDeselect,
    onDragStart,
    onDragEnd,
    onDragging,
  ]);

  return <>{children}</>;
};

export default Marker;
