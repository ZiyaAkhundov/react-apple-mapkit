import React, { useEffect, useRef, useContext } from "react";
import { AnnotationProps } from "../types/annotation-types";
import { MapContext } from "../contexts/MapContext";  // Assuming a MapContext is used for map reference

const Annotation: React.FC<AnnotationProps> = ({
  latitude,
  longitude,
  size,
  title,
  subtitle,
  accessibilityLabel,
  anchorOffsetX = 0,
  anchorOffsetY = 0,
  selected = false,
  animates = false,
  appearanceAnimation,
  draggable = false,
  enabled = true,
  visible = true,
  clusteringIdentifier,
  collisionMode = "Rectangle",
  displayPriority = 500,
  calloutOffsetX = 0,
  calloutOffsetY = 0,
  calloutEnabled = true,
  calloutLeftAccessory,
  calloutRightAccessory,
  calloutContent,
  calloutElement,
  children,

  // Event handlers
  onSelect,
  onDeselect,
  onDragStart,
  onDragEnd,
  onDragging,
}) => {
  const annotationRef = useRef<mapkit.Annotation | null>(null);
  const map = useContext(MapContext);  // Get the map instance from context

  useEffect(() => {
    if (!window.mapkit || !map) return;

    const coordinate = new window.mapkit.Coordinate(latitude, longitude);
    const options: mapkit.AnnotationConstructorOptions = {
      title,
      subtitle,
      accessibilityLabel,
      anchorOffset: new DOMPoint(anchorOffsetX, anchorOffsetY),
      selected,
      animates,
      appearanceAnimation,
      draggable,
      enabled,
      visible,
      clusteringIdentifier,
      collisionMode: collisionMode.toLowerCase() as any,
      displayPriority: typeof displayPriority === "string" ? displayPriority : displayPriority,
      calloutOffset: new DOMPoint(calloutOffsetX, calloutOffsetY),
      calloutEnabled,
      calloutLeftAccessory,
      calloutRightAccessory,
      calloutContent,
      calloutElement,
    };

    const annotation = new window.mapkit.Annotation(coordinate, options);
    annotationRef.current = annotation;

    // Apply size if specified
    if (size) {
      const element = annotation.element as HTMLElement;
      element.style.width = `${size.width}px`;
      element.style.height = `${size.height}px`;
    }

    // Add annotation to map
    map.addAnnotation(annotation);

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

    annotation.addEventListener("select", handleSelect as EventListener);
    annotation.addEventListener("deselect", handleDeselect as EventListener);
    annotation.addEventListener("drag-start", handleDragStart as EventListener);
    annotation.addEventListener("drag-end", handleDragEnd as EventListener);
    annotation.addEventListener("dragging", handleDragging as EventListener);

    return () => {
      if (annotationRef.current) {
        // Remove event listeners
        annotation.removeEventListener("select", handleSelect as EventListener);
        annotation.removeEventListener("deselect", handleDeselect as EventListener);
        annotation.removeEventListener("drag-start", handleDragStart as EventListener);
        annotation.removeEventListener("drag-end", handleDragEnd as EventListener);
        annotation.removeEventListener("dragging", handleDragging as EventListener);

        // Remove annotation from map
        map.removeAnnotation(annotationRef.current);

        annotationRef.current = null;
      }
    };
  }, [
    map,
    latitude,
    longitude,
    size,  // Added size as a dependency
    title,
    subtitle,
    accessibilityLabel,
    anchorOffsetX,
    anchorOffsetY,
    selected,
    animates,
    appearanceAnimation,
    draggable,
    enabled,
    visible,
    clusteringIdentifier,
    collisionMode,
    displayPriority,
    calloutOffsetX,
    calloutOffsetY,
    calloutEnabled,
    calloutLeftAccessory,
    calloutRightAccessory,
    calloutContent,
    calloutElement,
    onSelect,
    onDeselect,
    onDragStart,
    onDragEnd,
    onDragging,
  ]);

  return <>{children}</>;
};

export default Annotation;
