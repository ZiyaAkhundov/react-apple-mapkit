import { useEffect } from "react";

export default function forwardMapkitEvent<E>(
    element: mapkit.Map | mapkit.Annotation | mapkit.MarkerAnnotation | null,
    name: String,
    handler: ((mapkitReactEvent: E) => void) | undefined,
    eventMap: (mapkitEvent: any) => E,
  ) {
    useEffect(() => {
      if (!element || !handler) return undefined;
  
      const mapkitHandler = (e) => {
        handler(eventMap(e));
      };
  
      // @ts-ignore
      element.addEventListener(name, mapkitHandler);
      // @ts-ignore
      return () => element.removeEventListener(name, mapkitHandler);
    }, [element, handler]);
  }