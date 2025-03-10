# **MapKit React Integration**
A comprehensive library to seamlessly integrate **Apple MapKit JS** with **React**. This library provides TypeScript support and rich configuration options for maps, markers, and annotations.

---

## **Table of Contents**
1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Configuration](#configuration)
   - [Map Configuration](#map-configuration)
   - [Marker Configuration](#marker-configuration)
   - [Annotation Configuration](#annotation-configuration)
4. [Event Handling](#event-handling)
5. [Examples](#examples)
6. [API Reference](#api-reference)
7. [License](#license)

---

## **1. Installation**
Install the package using npm or yarn:

```bash
npm install react-apple-mapkit
```

or

```bash
yarn add react-apple-mapkit
```

---

## **2. Getting Started**

### **Initialization**
Before using the map, you need to initialize MapKit with an authentication token.

```tsx
import React from 'react';
import Map from 'react-apple-mapkit';

const App = () => {
  return (
    <Map token="YOUR_MAPKIT_JS_TOKEN">
      <h1>Apple MapKit Integration</h1>
    </Map>
  );
};

export default App;
```

---

## **3. Configuration**

### **3.1 Map Configuration**
| **Prop**                          | **Type**                            | **Default**                      | **Description**                                                           |
|-----------------------------------|-------------------------------------|----------------------------------|---------------------------------------------------------------------------|
| `token`                           | `string`                            | **Required**                     | MapKit JS API token.                                                      |
| `mapType`                         | `standard`, `mutedStandard`, `hybrid`, `satellite` | `standard`                       | Map type.                                                                 |
| `distances`                       | `adaptive`, `metric`, `imperial`    | `adaptive`                       | Distance measurement system.                                              |
| `showsCompass`                    | `FeatureVisibility`                 | `adaptive`                       | Compass visibility.                                                       |
| `showsScale`                      | `FeatureVisibility`                 | `hidden`                         | Scale visibility.                                                         |
| `cameraBoundary`                  | `CoordinateRegion`                  | `null`                           | Restrict map camera boundary.                                             |
| `cameraZoomRange`                 | `{ min: number, max: number }`      | `{ min: 0, max: Infinity }`      | Define zoom limits for the camera.                                        |
| `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft` | `number`                           | `0`                               | Map padding.                                                              |
| `onRegionChangeStart`             | `(region: CoordinateRegion) => void`| `undefined`                      | Event triggered at region change start.                                   |
| `onRegionChangeEnd`               | `(region: CoordinateRegion) => void`| `undefined`                      | Event triggered at region change end.                                     |

---

### **3.2 Marker Configuration**
| **Prop**                         | **Type**                              | **Default**                   | **Description**                                                            |
|----------------------------------|---------------------------------------|--------------------------------|----------------------------------------------------------------------------|
| `latitude`                       | `number`                              | **Required**                  | Marker latitude.                                                           |
| `longitude`                      | `number`                              | **Required**                  | Marker longitude.                                                          |
| `title`                          | `string`                              | `""`                          | Marker title.                                                              |
| `subtitle`                       | `string`                              | `""`                          | Marker subtitle.                                                           |
| `color`                          | `string`                              | `#fb0000`                     | Marker color.                                                              |
| `glyphColor`                     | `string`                              | `#ffffff`                     | Glyph text color.                                                          |
| `collisionMode`                  | `'Rectangle'` or `'Circle'` or `null` | `null`                        | Collision detection mode.                                                  |
| `subtitleVisibility`             | `FeatureVisibility`                   | `adaptive`                    | Subtitle visibility.                                                       |
| `titleVisibility`                | `FeatureVisibility`                   | `adaptive`                    | Title visibility.                                                          |

---

### **3.3 Annotation Configuration**
| **Prop**                         | **Type**                             | **Default**                     | **Description**                                                            |
|----------------------------------|--------------------------------------|---------------------------------|----------------------------------------------------------------------------|
| `latitude`                       | `number`                             | **Required**                    | Annotation latitude.                                                       |
| `longitude`                      | `number`                             | **Required**                    | Annotation longitude.                                                      |
| `title`                          | `string`                             | `""`                            | Annotation title.                                                          |
| `subtitle`                       | `string`                             | `""`                            | Annotation subtitle.                                                       |
| `collisionMode`                  | `'Rectangle'` or `'Circle'` or `null`| `null`                          | Collision detection mode.                                                  |
| `calloutElement`                 | `ReactNode`                          | `undefined`                     | Custom callout content.                                                    |
| `calloutOffsetX`, `calloutOffsetY` | `number`                            | `0`                             | Callout offset adjustments.                                                |

---

## **4. Event Handling**
Events can be easily attached to map and markers.

### **Map Events**
| **Event**                       | **Description**                                                            |
|---------------------------------|----------------------------------------------------------------------------|
| `onLoad`                        | Triggered when the map is loaded.                                          |
| `onRegionChangeStart`           | Triggered at the start of region change.                                   |
| `onRegionChangeEnd`             | Triggered at the end of region change.                                     |
| `onSingleTap`                   | Triggered on single tap.                                                   |

### **Marker Events**
| **Event**                       | **Description**                                                            |
|---------------------------------|----------------------------------------------------------------------------|
| `onSelect`                      | Triggered when a marker is selected.                                       |
| `onDeselect`                    | Triggered when a marker is deselected.                                     |
| `onDragStart`                   | Triggered when dragging starts.                                            |
| `onDragEnd`                     | Triggered when dragging ends.                                              |

---

## **5. Examples**

### **Basic Map**
```tsx
import React from 'react';
import Map from 'react-apple-mapkit';

const App = () => (
  <Map token="YOUR_MAPKIT_JS_TOKEN">
    <h2>My Map</h2>
  </Map>
);

export default App;
```

### **Map with Marker**
```tsx
import React from 'react';
import Map from 'react-apple-mapkit';
import Marker from 'react-apple-mapkit/Marker';

const App = () => (
  <Map token="YOUR_MAPKIT_JS_TOKEN">
    <Marker latitude={37.7749} longitude={-122.4194} title="San Francisco" />
  </Map>
);

export default App;
```

---

## **6. API Reference**

### **Coordinate**
Represents a point on the Earth’s surface.
```ts
interface Coordinate {
  latitude: number;
  longitude: number;
}
```

### **CoordinateRegion**
Represents a geographic region.
```ts
interface CoordinateRegion {
  centerLatitude: number;
  centerLongitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
```

---

## **7. License**
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

For more detailed information, visit the [official documentation](https://developer.apple.com/documentation/mapkitjs). 🎉