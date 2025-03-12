import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import mapLoader from "../../utils/map-loader";
import MapContext from "../../context/MapContext";
import { Distances, FeatureVisibility, MapType } from "../../enums";
import MapProps from "../../types/map-types";
import {
  generateRegion,
  toMapCoordinateRegion,
} from "../../utils/converter";
import forwardMapkitEvent from "../../utils/event";
import {
  MapKitMapInteractionEvent,
  MapKitUserLocationChangeEvent,
  MapKitUserLocationErrorEvent,
} from "../../types/event-types";
import useMapBooleanProperties from "./hooks/useMapBooleanProperties";
import useMapFeatureVisibilityProperties from "./hooks/useMapFeatureVisibilityProperties";
import useMapPadding from "./hooks/useMapPadding";
import useMapType from "./hooks/useMapType";
import useMapDistances from "./hooks/useMapDistances";
import useMapCameraBoundary from "./hooks/useMapCameraBoundary";
import useMapCameraZoomRange from "./hooks/useMapCameraZoomRange";
import useMapPointOfInterestFilter from "./hooks/useMapPointOfInterestFilter";
import { convertFromMapType } from "../../utils/map-type";

const Map = React.forwardRef<
  mapkit.Map | null,
  React.PropsWithChildren<MapProps>
>(
  (
    {
      children = undefined,
      load: customLoad,
      token,
      mapType = MapType.Standard,
      distances = Distances.Adaptive,
      isRotationEnabled = true,
      isScrollEnabled = true,
      isZoomEnabled = true,
      showsCompass = FeatureVisibility.Adaptive,
      showsScale = FeatureVisibility.Hidden,
      showsMapTypeControl = true,
      showsZoomControl = true,
      showsUserLocationControl = false,
      showsPointsOfInterest = true,
      showsUserLocation = false,
      tracksUserLocation = false,

      includedPOICategories = undefined,
      excludedPOICategories = undefined,

      paddingTop = 0,
      paddingRight = 0,
      paddingBottom = 0,
      paddingLeft = 0,

      initialRegion = undefined,
      cameraBoundary = undefined,
      minCameraDistance = 0,
      maxCameraDistance = Infinity,

      onLoad = undefined,

      onRegionChangeStart = undefined,
      onRegionChangeEnd = undefined,
      onMapTypeChange = undefined,

      onSingleTap = undefined,
      onDoubleTap = undefined,
      onLongPress = undefined,

      onUserLocationChange = undefined,
      onUserLocationError = undefined,

      onClick = undefined,
      onMouseMove = undefined,
      onMouseDown = undefined,
      onMouseUp = undefined,
    },
    mapRef
  ) => {
    const [map, setMap] = useState<mapkit.Map | null>(null);
    const element = useRef<HTMLDivElement>(null);
    const exists = useRef<boolean>(false);

    useEffect(() => {
      const loadMap = typeof customLoad === "function" ? customLoad : mapLoader;
      loadMap(token).then(() => {
        if (exists.current) return;
        const options = initialRegion
          ? { region: toMapCoordinateRegion(initialRegion) }
          : {};
        setMap(new mapkit.Map(element.current!, options));
        exists.current = true;
      });

      return () => {
        if (map) {
          map.destroy();
          exists.current = false;
        }
      };
    }, []);

    useEffect(() => {
      if (map !== null) {
        onLoad?.();
      }
    }, [map]);

    useImperativeHandle(mapRef, () => map!, [map]);

    const booleanProperties = {
      isRotationEnabled,
      isScrollEnabled,
      isZoomEnabled,
      showsMapTypeControl,
      showsZoomControl,
      showsUserLocationControl,
      showsPointsOfInterest,
      showsUserLocation,
      tracksUserLocation,
    };

    useMapBooleanProperties(map, booleanProperties);

    const featureVisibilityProperties = {
      showsCompass,
      showsScale,
    };
   
    useMapFeatureVisibilityProperties(map, featureVisibilityProperties);

    useMapPadding(map, paddingTop, paddingRight, paddingBottom, paddingLeft);
    useMapType(map, mapType);
    useMapDistances(map, distances);
    useMapCameraBoundary(map, cameraBoundary);
    useMapCameraZoomRange(map, minCameraDistance, maxCameraDistance);
    useMapPointOfInterestFilter(map, includedPOICategories, excludedPOICategories);

    // MapKit JS events
    const regionHandler = () => generateRegion(map!.region);
    forwardMapkitEvent(
      map,
      "region-change-start",
      onRegionChangeStart,
      regionHandler
    );
    forwardMapkitEvent(
      map,
      "region-change-end",
      onRegionChangeEnd,
      regionHandler
    );
    forwardMapkitEvent(map, "map-type-change", onMapTypeChange, () =>
      convertFromMapType(map!.mapType)
    );

    const interactionEvent = ({
      domEvents,
      pointOnPage,
    }: MapKitMapInteractionEvent) => ({
      domEvents,
      pointOnPage,
      toCoordinates: () => map!.convertPointOnPageToCoordinate(pointOnPage),
    });
    forwardMapkitEvent(map, "single-tap", onSingleTap, interactionEvent);
    forwardMapkitEvent(map, "double-tap", onDoubleTap, interactionEvent);
    forwardMapkitEvent(map, "long-press", onLongPress, interactionEvent);

    forwardMapkitEvent(
      map,
      "user-location-change",
      onUserLocationChange,
      ({
        coordinate: { latitude, longitude },
        timestamp,
        floorLevel,
      }: MapKitUserLocationChangeEvent) => ({
        coordinate: { latitude, longitude },
        timestamp,
        floorLevel,
      })
    );

    forwardMapkitEvent(
      map,
      "user-location-error",
      onUserLocationError,
      ({ code, message }: MapKitUserLocationErrorEvent) => ({ code, message })
    );

    const domEvents = [
      { name: "click", handler: onClick },
      { name: "mousemove", handler: onMouseMove },
      { name: "mousedown", handler: onMouseDown },
      { name: "mouseup", handler: onMouseUp },
    ] as const;
    domEvents.forEach(({ name, handler }) => {
      useEffect(() => {
        if (!map || !handler) return undefined;

        const listener = (e: MouseEvent) => {
          handler({
            domEvents: [e],
            pointOnPage: { x: e.pageX, y: e.pageY },
            toCoordinates() {
              const { latitude, longitude }: mapkit.Coordinate =
                map.convertPointOnPageToCoordinate(
                  new DOMPoint(e.pageX, e.pageY)
                );
              return { latitude, longitude };
            },
          });
        };

        element.current?.addEventListener(name, listener);
        return () => element.current?.removeEventListener(name, listener);
      }, [map, handler]);
    });

    return (
      <div style={{ width: "100%", height: "100%" }} ref={element}>
        <MapContext.Provider value={map}>{children}</MapContext.Provider>
      </div>
    );
  }
);

export default Map;
