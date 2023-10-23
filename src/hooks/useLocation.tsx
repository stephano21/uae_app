import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef, useState} from 'react';
import {Location} from '../interfaces/UserInterface';

export const useLocation = () => {
  const [hasLocation, sethasLocation] = useState(false);
  const [initialPosition, setinitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setuserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [routeLines, setrouteLines] = useState<Location[]>([]);
  const watchId = useRef<number>();
  const following = useRef<boolean>(true);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrenLocation().then(location => {
      console.log('getCurrenLocation', location);
      if (!isMounted.current) return;
      setinitialPosition(location);
      setuserLocation(location);
      //setrouteLines(routes => [...routes, location]);
      sethasLocation(true);
    });
  }, []);

  const getCurrenLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {
          enableHighAccuracy: true,
          timeout: 2000,
        },
      );
    });
  };
  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) return;
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setuserLocation(location);
        //setrouteLines(routes => [...routes, location]);
      },
      err => console.log({err}),
      {
        enableHighAccuracy: true,
        distanceFilter: 3,
      },
    );
  };
  const stopFollowUserLocation = () => {
    if (watchId.current) Geolocation.clearWatch(watchId.current);
  };
  return {
    hasLocation,
    initialPosition,
    getCurrenLocation,
    userLocation,
    followUserLocation,
    setuserLocation,
    stopFollowUserLocation,
    following,
    routeLines,
  };
};
