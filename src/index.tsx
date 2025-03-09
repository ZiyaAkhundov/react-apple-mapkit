// Export components
export { default as Map } from "./components/Map";
export { default as MapkitProvider } from "./components/MapkitProvider";
export { default as Annotation } from "./components/Annotation";
export { default as Marker } from "./components/Marker";
export { default as Polyline } from "./components/Polyline";
export { default as Polygon } from "./components/Polygon";

// Export contexts
export { default as MapContext } from "./contexts/MapContext";

// Explicitly re-export `Coordinate` from a single source
export { Coordinate } from "./types/map-types";

// Export other types
export * from "./types/map-types";
export * from "./types/annotation-types";
export * from "./types/polygon-types";
export * from "./types/polyline-types";
