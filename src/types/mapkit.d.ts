// Declare the mapkit namespace globally
declare namespace mapkit {
  // Map constructor and types
  interface MapConstructor {
    new (element: HTMLElement): Map;
    MapTypes: {
      STANDARD: string;
      HYBRID: string;
      SATELLITE: string;
    };
    ColorSchemes: {
      DARK: string;
      LIGHT: string;
      AUTO: string;
    };
    Distances: {
      METRIC: string;
      IMPERIAL: string;
    };
  }

  // Map instance methods and properties
  interface Map {
    mapType: string;
    colorScheme: string;
    distances: string;
    showsUserLocation: boolean;
    isRotationEnabled: boolean;
    isScrollEnabled: boolean;
    isZoomEnabled: boolean;

    showsCompass: boolean;
    showsScale: boolean;
    showsMapTypeControl: boolean;
    showsZoomControl: boolean;
    showsUserLocationControl: boolean;
    tracksUserLocation: boolean;

    region: CoordinateRegion;

    addAnnotation(annotation: Annotation): void;
    removeAnnotation(annotation: Annotation): void;
    addOverlay(overlay: Overlay): void;
    removeOverlay(overlay: Overlay): void;

    addEventListener(
      event: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
      event: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions
    ): void;
    destroy(): void;
  }

  // Coordinate definition
  interface Coordinate {
    latitude: number;
    longitude: number;
  }

  const Coordinate: {
    new (latitude: number, longitude: number): Coordinate;
  };

  // CoordinateSpan definition
  interface CoordinateSpan {
    latitudeDelta: number;
    longitudeDelta: number;
  }

  const CoordinateSpan: {
    new (latitudeDelta: number, longitudeDelta: number): CoordinateSpan;
  };

  // CoordinateRegion definition
  interface CoordinateRegion {
    center: Coordinate;
    span: CoordinateSpan;
  }

  const CoordinateRegion: {
    new (center: Coordinate, span: CoordinateSpan): CoordinateRegion;
  };

  // MarkerAnnotation options
  interface MarkerAnnotationOptions {
    title?: string;
    subtitle?: string;
    selected?: boolean;
    draggable?: boolean;
    visible?: boolean;
    color?: string;
    glyphText?: string;
    glyphImage?: string;
    displayPriority?: number | "low" | "high" | "required";
  }

  // MarkerAnnotation interface
  interface MarkerAnnotation extends Annotation {
    color?: string;
    glyphText?: string;
    glyphImage?: string;
  }

  const MarkerAnnotation: {
    new (
      coordinate: Coordinate,
      options?: MarkerAnnotationOptions
    ): MarkerAnnotation;
  };

  // Annotation options
  interface AnnotationConstructorOptions {
    title?: string;
    subtitle?: string;
    accessibilityLabel?: string;
    anchorOffset?: DOMPoint;
    selected?: boolean;
    animates?: boolean;
    appearanceAnimation?: string;
    draggable?: boolean;
    enabled?: boolean;
    visible?: boolean;
    clusteringIdentifier?: string;
    collisionMode?: "rectangle" | "circle" | "none";
    displayPriority?: number | "low" | "high" | "required";
    calloutOffset?: DOMPoint;
    calloutEnabled?: boolean;
    calloutLeftAccessory?: React.ReactNode;
    calloutRightAccessory?: React.ReactNode;
    calloutContent?: React.ReactNode;
    calloutElement?: React.ReactNode;
  }

  // Annotation interface
  interface Annotation extends EventTarget {
    coordinate: Coordinate;
    title?: string;
    subtitle?: string;
    selected: boolean;
    draggable: boolean;
    visible: boolean;
    remove(): void;
    addEventListener(
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions
    ): void;
    element?: HTMLElement;
  }

  // PolygonOverlay options
  interface PolygonOverlayOptions {
    fillColor?: string; // Directly add fillColor here
    strokeColor?: string; // Directly add strokeColor here
    lineWidth?: number; // Directly add lineWidth here
  }

  // PolygonOverlay interface
  interface PolygonOverlay extends Overlay {
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions
    ): void;
  }

  const PolygonOverlay: {
    new (
      coordinates: Coordinate[],
      options?: PolygonOverlayOptions
    ): PolygonOverlay;
  };

  // PolylineOverlay options
  interface PolylineOverlayOptions {
    strokeColor?: string;
    lineWidth?: number;
    lineCap?: "butt" | "round" | "square"; // Kept lineCap as it's supported
    lineDash?: number[]; // Added lineDash to support dashed lines
  }

  // PolylineOverlay interface
  interface PolylineOverlay extends Overlay {
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions
    ): void;
  }

  const PolylineOverlay: {
    new (
      coordinates: Coordinate[],
      options?: PolylineOverlayOptions
    ): PolylineOverlay;
  };

  // Overlay interface
  interface Overlay extends EventTarget {}

  // Annotation event interface
  interface AnnotationEvent extends Event {
    coordinate: Coordinate;
  }

  const Annotation: {
    new (
      coordinate: Coordinate,
      options?: AnnotationConstructorOptions
    ): Annotation;
  };

  // Event types
  interface MapInteractionEvent {
    latitude: number;
    longitude: number;
    x: number;
    y: number;
  }

  interface UserLocationErrorEvent {
    code: number;
    message: string;
  }

  // Event handler types
  type LoadEventHandler = () => void;
  type RegionChangeStartEventHandler = (currentValue: CoordinateRegion) => void;
  type RegionChangeEndEventHandler = (newValue: CoordinateRegion) => void;
  type MapTypeChangeEventHandler = (newValue: string) => void;
  type MapInteractionEventHandler = (event: MapInteractionEvent) => void;
  type UserLocationChangeEventHandler = (location: Coordinate) => void;
  type UserLocationErrorEventHandler = (event: UserLocationErrorEvent) => void;
  type AnnotationEventHandler = (event: AnnotationEvent) => void;

  // Initialize MapKit
  function init(options: {
    authorizationCallback: (done: (token: string) => void) => void;
  }): void;

  var Map: MapConstructor;
}

// Extend the global Window interface
interface Window {
  mapkit: typeof mapkit;
}
