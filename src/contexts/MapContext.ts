import { createContext, useContext } from "react";

// Create a context for mapkit.Map with a default value of null
const MapContext = createContext<mapkit.Map | null>(null);  // Changed to default export

// Custom hook to access the map instance
export const useMap = () => {
  const map = useContext(MapContext);
  if (!map) {
    throw new Error("useMap must be used within a MapContext.Provider");
  }
  return map;
};

export default MapContext; 
