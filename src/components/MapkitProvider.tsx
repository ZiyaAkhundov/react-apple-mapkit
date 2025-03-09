import React, { useEffect } from "react";

interface MapkitProviderProps {
  token: string;
  children: React.ReactNode;
  onError?: (error: { status: number; message: string }) => void;  // New onError prop
}

const MapkitProvider: React.FC<MapkitProviderProps> = ({ token, children, onError }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";
    script.async = true;

    script.onload = () => {
      try {
        if (window.mapkit) {
          window.mapkit.init({
            authorizationCallback: (done) => {
              done(token);
            },
          });
        } else {
          onError?.({
            status: 503,
            message: "MapKit JS is not available.",
          });
        }
      } catch (error) {
        console.error("MapKit initialization error:", error);
        onError?.({
          status: 500,
          message: (error as Error).message || "MapKit initialization failed.",
        });
      }
    };

    script.onerror = () => {
      console.error("Failed to load MapKit JS script.");
      onError?.({
        status: 404,
        message: "Failed to load MapKit JS script.",
      });
    };

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [token, onError]);

  return <>{children}</>;
};

export default MapkitProvider;
