import axios, {AxiosError, AxiosResponse} from 'axios';

import {useEffect, useState} from 'react';
import {useLocation} from '../../hooks/useLocation';
import {
  Prediction,
  GoogleMapsDirection,
  GoogleMapsPredictionResult,
  GoogleMapsPrediction,
} from '../../interfaces/GoogleInterfaces';
import {Location} from '../../interfaces/UserInterface';

const GOOGLE_PLACES_API_KEY = 'AIzaSyD4PoTTGv2lDTYKdaxJDBysn4kcgV-9ULI';
export const useGoogleSearch = () => {
  const [direccionGoogle, setDireccionGoogle] = useState<Prediction[]>([]);
  const {userLocation} = useLocation();
  const [buscarText, setBuscarText] = useState('');
  const [selectedPlaceLocation, setselectedPlaceLocation] =
    useState<Location>(userLocation);
  const [GoogleAddress, setGoogleAddress] = useState('');

  // obtener la direccion de google por medio de la latitud y la longitud
  const getGoogleAddress = async (location: Location) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_PLACES_API_KEY}`;
    const resp = await fetch(url);
    const respJson: GoogleMapsDirection = await resp.json();
    const address = respJson.results[0].formatted_address;
    setGoogleAddress(address);
    console.log(address);
  };

  const selectDireccionGoogle = async (direcionPrediccion: Prediction) => {
    var prediccion = direcionPrediccion;
    consultarPlaceGeoLocalizacion(prediccion.place_id);
    setBuscarText(prediccion.description);
    setDireccionGoogle([]);
  };

  const consultarPlaceGeoLocalizacion = async (idPlace: string) => {
    var config = {
      method: 'get',
      url:
        'https://maps.googleapis.com/maps/api/place/details/json?place_id=' +
        idPlace +
        '&key=' +
        GOOGLE_PLACES_API_KEY,
      headers: {},
    };
    axios(config)
      .then(
        ({
          data: {
            result: {
              geometry: {location},
            },
          },
        }: AxiosResponse<GoogleMapsPredictionResult>) => {
          setselectedPlaceLocation({
            latitude: location.lat,
            longitude: location.lng,
          });
        },
      )
      .catch((response: AxiosError<any>) => {
        console.log(JSON.stringify(response, null, 3));
      });
  };

  const consultarAutocompleteGoogle = async (textoDireccion: string) => {
    var config = {
      method: 'get',
      url:
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=' +
        GOOGLE_PLACES_API_KEY +
        '&input=' +
        textoDireccion,
      headers: {},
    };
    axios(config)
      .then(({data}: AxiosResponse<GoogleMapsPrediction>) => {
        setDireccionGoogle(data.predictions);
      })
      .catch((error: any) => {
        console.log(JSON.stringify(error, null, 3));
      });
  };

  const onChange = (i: string) => {
    setBuscarText(i);
    if (i.length > 2) {
      consultarAutocompleteGoogle(i);
    }
  };

  useEffect(() => {
    setselectedPlaceLocation(userLocation);
  }, [userLocation]);

  return {
    direccionGoogle,
    buscarText,
    onChange,
    selectDireccionGoogle,
    selectedPlaceLocation,
    setselectedPlaceLocation,
  };
};
