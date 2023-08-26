import React, {createContext, useState} from 'react';
import {Location} from '../interfaces/UserInterface';
import {MapModal} from './Map/MapModal';

type MapContextProps = {
  showMap: (location?: Location, hasSearchLocation?: boolean) => void;
};

export const MapContext = createContext({} as MapContextProps);

export const MapProvider = ({children}: any) => {
  const [MapVisible, setMapVisible] = useState(false);
  const [location, setlocation] = useState<Location>();
  const [searchLocation, setsearchLocation] = useState(false);

  const showMap = (location?: Location, hasSearchLocation: boolean = false) => {
    setMapVisible(true);
    setsearchLocation(hasSearchLocation);
    if (location !== undefined) {
      setlocation(location);
    }
  };
  return (
    <MapContext.Provider
      value={{
        showMap,
      }}>
      {children}
      <MapModal
        location={location}
        hasSearchLocation={searchLocation}
        CloseFunction={() => setMapVisible(false)}
        isVisible={MapVisible}></MapModal>
    </MapContext.Provider>
  );
};
