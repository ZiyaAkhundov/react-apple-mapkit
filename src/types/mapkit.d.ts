declare namespace mapkit {
  // Coordinate: Represents a point on the Earth's surface.
  interface Coordinate {
    latitude: number;
    longitude: number;
  }

  // CoordinateSpan: Represents the amount of map to display in latitude and longitude degrees.
  interface CoordinateSpan {
    latitudeDelta: number;
    longitudeDelta: number;
  }

  // CoordinateRegion: Represents a rectangular geographic region centered around a coordinate.
  interface CoordinateRegion {
    center: Coordinate;
    span: CoordinateSpan;
  }

  // Initialize the MapKit JS library.
  function init(options: InitOptions): void;

  // Options for initializing MapKit JS.
  interface InitOptions {
    authorizationCallback: (done: (token: string) => void) => void;
    language?: string; // Optional: Set the language for the map.
    mapType?: Map.MapTypes; // Optional: Set a default map type.
    build?: string; // Optional: Specify a build version.
    tileSize?: number; // Optional: Specify tile size (e.g., 256 or 512).
    showsUserLocationControl?: boolean; // Optional: Show user location control.
  }

  // Map: Represents a MapKit JS map object.
  class Map {
    constructor(
      container: string | HTMLElement,
      options?: MapConstructorOptions
    );

    // Properties
    center: Coordinate;
    region: CoordinateRegion;
    mapType: Map.MapTypes;
    colorScheme: Map.ColorSchemes;
    distances: Map.Distances;
    showsPointsOfInterest: boolean;
    showsScale: boolean;
    padding: Padding;
    pointOfInterestFilter?: PointOfInterestFilter;
    cameraBoundary?: CoordinateRegion | null;
    cameraZoomRange?: CameraZoomRange | null;

    // Methods
    setCenterCoordinate(coordinate: Coordinate, animated?: boolean): void;
    setRegion(region: CoordinateRegion, animated?: boolean): void;
    addAnnotation(annotation: Annotation): void;
    removeAnnotation(annotation: Annotation): void;
    setFeatureVisibility(feature: string, visibility: FeatureVisibility): void;
    convertPointOnPageToCoordinate(point: DOMPoint): Coordinate;
    destroy(): void;

    // Event handling methods
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
  }

  class MarkerAnnotation implements Annotation {
    constructor(coordinate: Coordinate, options?: MarkerAnnotationOptions);

    coordinate: Coordinate;
    title?: string;
    subtitle?: string;
    glyphText?: string;
    selected?: boolean;
    displayPriority?: number;
    padding?: Padding;
    anchorOffset?: DOMPoint;
    calloutOffset?: DOMPoint;
    callout?: AnnotationCalloutDelegate;
    collisionMode?: Annotation.CollisionMode;

    glyphImage?: string;
    glyphColor?: string;
    markerColor?: string;
    animates?: boolean;
    selectedGlyphImage?: string;
    clusteringIdentifier?: string;

    subtitleVisibility?: FeatureVisibility; // Added subtitleVisibility property
    titleVisibility?: FeatureVisibility; // Added titleVisibility property

    select(): void;
    deselect(): void;

    // Event handling methods
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
  }

  // Options for creating a MarkerAnnotation.
  interface MarkerAnnotationOptions {
    title?: string;
    subtitle?: string;
    glyphText?: string;
    glyphImage?: string;
    glyphColor?: string;
    markerColor?: string;
    animates?: boolean;
    selectedGlyphImage?: string;
    clusteringIdentifier?: string;
    displayPriority?: number;
    padding?: Padding;
    anchorOffset?: DOMPoint;
    calloutOffset?: DOMPoint;
    callout?: AnnotationCalloutDelegate;
    collisionMode?: Annotation.CollisionMode;
    subtitleVisibility?: FeatureVisibility; // Added subtitleVisibility option
    titleVisibility?: FeatureVisibility; // Added titleVisibility option
  }

  interface AnnotationCalloutDelegate {
    calloutElementForAnnotation?: () => HTMLElement | null;
    calloutLeftAccessoryForAnnotation?: () => HTMLElement | null;
    calloutRightAccessoryForAnnotation?: () => HTMLElement | null;
    calloutContentForAnnotation?: () => HTMLElement | null;
  }

  namespace Map {
    enum MapTypes {
      Standard = "standard",
      MutedStandard = "mutedStandard",
      Hybrid = "hybrid",
      Satellite = "satellite",
    }

    enum ColorSchemes {
      Light = "light",
      Dark = "dark",
    }

    enum Distances {
      Adaptive = "adaptive",
      Metric = "metric",
      Imperial = "imperial",
    }

    enum LoadPriorities {
      LandCover = "landCover",
      PointsOfInterest = "pointsOfInterest",
      None = "none",
    }
    enum FeatureVisibility {
      Hidden = "hidden",
      Visible = "visible",
      Adaptive = "adaptive",
    }
  }

  namespace Annotation {
    enum CollisionMode {
      Circle = "circle",
      Rectangle = "rectangle",
    }
  }

  // Annotation: Represents a point of interest on the map.
  class Annotation {
    constructor(
      coordinate: Coordinate,
      element: (() => HTMLElement) | string | null,
      options?: AnnotationOptions
    );

    coordinate: Coordinate;
    title?: string;
    subtitle?: string;
    glyphText?: string;
    selected?: boolean;
    displayPriority?: number;
    padding?: Padding;
    anchorOffset?: DOMPoint;
    calloutOffset?: DOMPoint;
    callout?: AnnotationCalloutDelegate;
    collisionMode?: Annotation.CollisionMode; // Added collisionMode property

    // Methods
    select(): void;
    deselect(): void;

    // Event handling methods
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
  }

  // PointOfInterestCategory: Enum for POI categories.
  enum PointOfInterestCategory {
    Airport = "airport",
    AmusementPark = "amusementPark",
    Aquarium = "aquarium",
    ATM = "atm",
    Bakery = "bakery",
    Bank = "bank",
    Beach = "beach",
    Brewery = "brewery",
    Cafe = "cafe",
    Campground = "campground",
    CarRental = "carRental",
    EVCharger = "evCharger",
    FireStation = "fireStation",
    FitnessCenter = "fitnessCenter",
    FoodMarket = "foodMarket",
    GasStation = "gasStation",
    Hospital = "hospital",
    Hotel = "hotel",
    Laundry = "laundry",
    Library = "library",
    Marina = "marina",
    MovieTheater = "movieTheater",
    Museum = "museum",
    NationalPark = "nationalPark",
    Nightlife = "nightlife",
    Park = "park",
    Parking = "parking",
    Pharmacy = "pharmacy",
    Police = "police",
    PostOffice = "postOffice",
    PublicTransport = "publicTransport",
    Restaurant = "restaurant",
    Restroom = "restroom",
    School = "school",
    Stadium = "stadium",
    Store = "store",
    Theater = "theater",
    University = "university",
    Winery = "winery",
    Zoo = "zoo",
  }

  // FeatureVisibility: Enum for controlling visibility of map features.
  enum FeatureVisibility {
    Hidden = "hidden",
    Visible = "visible",
    Adaptive = "adaptive",
  }

  // Display priority for annotations.
  enum DisplayPriority {
    Low = "low",
    High = "high",
    Required = "required",
  }

  // Coordinate: Represents a point on the Earth's surface.
  class Coordinate {
    constructor(latitude: number, longitude: number);
    latitude: number;
    longitude: number;
  }

  // CoordinateSpan: Represents the amount of map to display in latitude and longitude degrees.
  class CoordinateSpan {
    constructor(latitudeDelta: number, longitudeDelta: number);
    latitudeDelta: number;
    longitudeDelta: number;
  }

  // CoordinateRegion: Represents a rectangular geographic region centered around a coordinate.
  class CoordinateRegion {
    constructor(center: Coordinate, span: CoordinateSpan);
    center: Coordinate;
    span: CoordinateSpan;
  }

  // Padding: Represents padding for the map view.
  class Padding {
    constructor(top: number, right: number, bottom: number, left: number);
    top: number;
    right: number;
    bottom: number;
    left: number;
  }

  // CameraZoomRange: Represents zoom range constraints for the map.
  class CameraZoomRange {
    constructor(minimumDistance: number, maximumDistance?: number);
    minimumDistance: number;
    maximumDistance?: number;
  }

  // PointOfInterestFilter: Filters points of interest displayed on the map.
  class PointOfInterestFilter {
    static including(
      categories: PointOfInterestCategory[]
    ): PointOfInterestFilter;
    static excluding(
      categories: PointOfInterestCategory[]
    ): PointOfInterestFilter;
  }

  // Interface for converter functions
  interface MapKitConverters {
    toMapKitFeatureVisibility(featureVisibility: FeatureVisibility): string;

    // Converts a custom CoordinateRegion to a MapKit CoordinateRegion.
    toMapKitCoordinateRegion(region: CoordinateRegion): mapkit.CoordinateRegion;

    // Converts a MapKit CoordinateRegion to a custom CoordinateRegion.
    fromMapKitRegion(region: mapkit.CoordinateRegion): CoordinateRegion;

    toMapKitMapType(mapType: Map.MapTypes): Map.MapTypes;
    toMapKitDistances(distances: Map.Distances): Map.Distances;
  }

  // Options for creating a Map instance.
  interface MapConstructorOptions {
    center?: Coordinate;
    region?: CoordinateRegion;
    mapType?: Map.MapTypes;
    colorScheme?: Map.ColorSchemes;
    distances?: Map.Distances;
    showsPointsOfInterest?: boolean;
    showsScale?: boolean;
    cameraBoundary?: CoordinateRegion | null;
    cameraZoomRange?: CameraZoomRange | null;
  }
}
