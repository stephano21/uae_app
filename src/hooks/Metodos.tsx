import {useContext, useState} from 'react';
import _lotes from './../api/test.json';
import Geolocation from 'react-native-geolocation-service';
import {ILocation, IPoligono} from './../interfaces/ApiInterface';
import {LoaderContext} from '../context/LoaderContext';
import {useRequest} from '../api/useRequest';
import {ApiEndpoints} from '../api/routes';

export const Metodos = () => {
  const [location, setLocation] = useState<ILocation>(); //definir un cuerpo o interfaz para location
  const {setIsLoading} = useContext(LoaderContext);
  const {getRequest} = useRequest();
  const [poligonos, setPoligonos] = useState<IPoligono[]>([]);

  const pointInRegion = (lat: number, lon: number, vertices: any[]) => {
    // Convertir las coordenadas a flotantes
    lat = parseFloat(lat.toString());
    lon = parseFloat(lon.toString());
    // Inicializar el contador
    let contador = 0;
    // Obtener el número de vértices del polígono
    const numVertices = vertices.length;
    //setIsFetching(true);
    // Iterar sobre los lados del polígono
    for (let i = 0; i < numVertices; i++) {
      const v1 = vertices[i];
      const v2 = vertices[(i + 1) % numVertices];

      if (
        v1.longitude > lon !== v2.longitude > lon &&
        lat <
          ((v2.latitude - v1.latitude) * (lon - v1.longitude)) /
            (v2.longitude - v1.longitude) +
            v1.latitude
      ) {
        contador++;
      }
    }
    // Si el contador es impar, el punto está dentro del polígono

    return contador % 2 === 1;
  };

  const getLocation2 = async (item: IPoligono[]) => {
    Geolocation.getCurrentPosition(
      async position => {
        const locationData: any = position.coords;
        locationData.region = item
          .filter(item =>
            pointInRegion(
              locationData.latitude,
              locationData.longitude,
              item.geocoordenadas.map((item: any) => ({
                longitude: parseFloat(item.lng),
                latitude: parseFloat(item.lat),
              })),
            ),
          )
          .map(item => ({
            Lote: item.Lote,
            Id: item.Id_Lote,
            Cod: item.CodigoLote,
          }));
        setLocation(locationData);
        console.log('datalocation', locationData);
        //setIsFetching(false);
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const geolotes = async () => {
    await getRequest<IPoligono[]>(ApiEndpoints.Poligonos)
      .then(lotes => {
        setPoligonos(lotes);
      })
      .catch(a => console.log(JSON.stringify(a, null, 3)));
  };
  return {
    getLocation2,
    geolotes,
    poligonos,
    location,
  };
};
