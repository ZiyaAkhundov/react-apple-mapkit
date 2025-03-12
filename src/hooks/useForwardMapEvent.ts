import { useEffect } from "react";

export default function useForwardMapEvent<E>(
  target: mapkit.Map | mapkit.Annotation | mapkit.MarkerAnnotation | null,
  eventName: string,
  eventHandler: ((reactEvent: E) => void) | undefined,
  mapKitEventMapper: (mapKitEvent: any) => E,
) {
  useEffect(() => {
    if (!target || !eventHandler) return undefined;

    const mapKitEventHandler = (event: any) => {
      eventHandler(mapKitEventMapper(event));
    };

    target.addEventListener(eventName, mapKitEventHandler);
    return () => target.removeEventListener(eventName, mapKitEventHandler);
  }, [target, eventHandler]);
}