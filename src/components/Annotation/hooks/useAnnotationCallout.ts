import { useLayoutEffect, RefObject, ReactNode } from "react";

const useAnnotationCallout = (
  annotation: mapkit.Annotation | null,
  calloutElement: ReactNode | undefined,
  calloutLeftAccessory: ReactNode | undefined,
  calloutRightAccessory: ReactNode | undefined,
  calloutContent: ReactNode | undefined,
  calloutElementRef: RefObject<HTMLDivElement>,
  calloutLeftAccessoryRef: RefObject<HTMLDivElement>,
  calloutRightAccessoryRef: RefObject<HTMLDivElement>,
  calloutContentRef: RefObject<HTMLDivElement>
) => {
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
      callOutObj.calloutContentForAnnotation = () =>
        calloutContentRef.current;
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
};

export default useAnnotationCallout;