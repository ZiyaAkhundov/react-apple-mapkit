import React, {
  useEffect,
  useRef,
  useContext,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import MapContext from "../context/MapContext";
import AnnotationProps from "../types/annotation-types";
import forwardMapkitEvent from "../utils/event";
import { createPortal } from "react-dom";
import CalloutContainer from "./CalloutContainer";

const Annotation: React.FC<AnnotationProps> = ({
  latitude,
  longitude,
  size = undefined,
  title = "",
  subtitle = "",
  accessibilityLabel = null,

  selected = false,
  animates = true,
  draggable = false,
  enabled = true,
  visible = true,

  clusteringIdentifier = null,
  collisionMode = undefined,

  calloutElement = undefined,
  calloutContent = undefined,
  calloutLeftAccessory = undefined,
  calloutRightAccessory = undefined,

  appearanceAnimation = "",
  calloutOffsetX = 0,
  calloutOffsetY = 0,
  calloutEnabled = true,
  children,

  paddingTop = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  anchorOffsetX = 0,
  anchorOffsetY = 0,

  // Event handlers
  onSelect = undefined,
  onDeselect = undefined,
  onDragStart = undefined,
  onDragEnd = undefined,
  onDragging = undefined,
}) => {
  const [annotation, setAnnotation] = useState<mapkit.Annotation | null>(null);
  const contentEl = useMemo<HTMLDivElement>(
    () => document.createElement("div"),
    []
  );
  const map = useContext(MapContext);

  useEffect(() => {
    if (!annotation) return;
    annotation.padding = new mapkit.Padding(
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    );
  }, [annotation, paddingTop, paddingRight, paddingBottom, paddingLeft]);

  // AnchorOffset
  useEffect(() => {
    if (!annotation) return;
    annotation.anchorOffset = new DOMPoint(anchorOffsetX, anchorOffsetY);
  }, [annotation, anchorOffsetX, anchorOffsetY]);

  // CalloutOffset
  useEffect(() => {
    if (!annotation) return;
    annotation.calloutOffset = new DOMPoint(calloutOffsetX, calloutOffsetY);
  }, [annotation, calloutOffsetX, calloutOffsetY]);

  const calloutLeftAccessoryRef = useRef<HTMLDivElement>(null);
  const calloutRightAccessoryRef = useRef<HTMLDivElement>(null);
  const calloutContentRef = useRef<HTMLDivElement>(null);
  const calloutElementRef = useRef<HTMLDivElement>(null);

  // Callout
  useLayoutEffect(() => {
    if (!annotation) return;

    const callOutObj: mapkit.AnnotationCalloutDelegate = {};
    if (calloutElement && calloutElementRef.current !== null) {
      callOutObj.calloutElementForAnnotation = () => calloutElementRef.current;
    }
    if (calloutLeftAccessory && calloutLeftAccessoryRef.current !== null) {
      callOutObj.calloutLeftAccessoryForAnnotation = () =>
        calloutLeftAccessoryRef.current;
    }
    if (calloutRightAccessory && calloutRightAccessoryRef.current !== null) {
      callOutObj.calloutRightAccessoryForAnnotation = () =>
        calloutRightAccessoryRef.current;
    }
    if (calloutContent && calloutContentRef.current !== null) {
      callOutObj.calloutContentForAnnotation = () => calloutContentRef.current;
    }
    if (Object.keys(callOutObj).length > 0) {
      annotation.callout = callOutObj;
    } else {
      delete annotation.callout;
    }

    return () => {
      delete annotation.callout;
    };
  }, [
    annotation,
    calloutElement,
    calloutLeftAccessory,
    calloutRightAccessory,
    calloutContent,
    calloutElementRef.current,
    calloutLeftAccessoryRef.current,
    calloutRightAccessoryRef.current,
    calloutContentRef.current,
  ]);

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

  const properties = {
    title,
    subtitle,
    accessibilityLabel,
    size,
    selected,
    animates,
    appearanceAnimation,
    draggable,
    enabled,
    visible,
    clusteringIdentifier,
    calloutEnabled,
  };

  Object.entries(properties).forEach(([propertyName, prop]) => {
    useEffect(() => {
      if (!annotation) return;
      if (prop === undefined) {
        delete annotation[propertyName];
        return;
      }
      annotation[propertyName] = prop;
    }, [annotation, prop]);
  });

  const handlerWithoutParameters = () => {};

  const events = [
    { name: "select", handler: onSelect },
    { name: "deselect", handler: onDeselect },
    { name: "drag-start", handler: onDragStart },
  ] as const;

  events.forEach(({ name, handler }) => {
    forwardMapkitEvent(annotation, name, handler, handlerWithoutParameters);
  });

  const dragEndParameters = () => ({
    latitude: annotation!.coordinate.latitude,
    longitude: annotation!.coordinate.longitude,
  });

  const draggingParameters = (e: { coordinate: mapkit.Coordinate }) => ({
    latitude: e.coordinate.latitude,
    longitude: e.coordinate.longitude,
  });

  forwardMapkitEvent(annotation, "drag-end", onDragEnd, dragEndParameters);
  forwardMapkitEvent(annotation, "dragging", onDragging, draggingParameters);

  useLayoutEffect(() => {
    if (map === null) return undefined;

    const a = new mapkit.Annotation(
      new mapkit.Coordinate(latitude, longitude),
      () => contentEl
    );
    map.addAnnotation(a);
    setAnnotation(a);

    return () => {
      map.removeAnnotation(a);
    };
  }, [map, latitude, longitude]);

  return (
    <>
      {createPortal(
        <div style={{ display: "none" }}>
          {calloutContent !== undefined && (
            <CalloutContainer ref={calloutContentRef} type="content">
              {calloutContent}
            </CalloutContainer>
          )}
          {calloutLeftAccessory !== undefined && (
            <CalloutContainer ref={calloutLeftAccessoryRef} type="left">
              {calloutLeftAccessory}
            </CalloutContainer>
          )}
          {calloutRightAccessory !== undefined && (
            <CalloutContainer ref={calloutRightAccessoryRef} type="right">
              {calloutRightAccessory}
            </CalloutContainer>
          )}
          {calloutElement !== undefined && (
            <CalloutContainer ref={calloutElementRef} type="container">
              {calloutElement}
            </CalloutContainer>
          )}
        </div>,
        document.body
      )}
      {createPortal(children, contentEl)}
    </>
  );
};

export default Annotation;
