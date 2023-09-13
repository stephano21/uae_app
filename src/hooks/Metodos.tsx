import {useContext, useState} from 'react';
import _lotes from './../api/test.json';
import {ILocation, IPoligono} from './../interfaces/ApiInterface';
import {LoaderContext} from '../context/LoaderContext';
import {useRequest} from '../api/useRequest';
import {ApiEndpoints} from '../api/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Metodos = () => {
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

  // const getLocation2 = async (items: Geolotes[]) => {
  //   Geolocation.getCurrentPosition(
  //     async position => {
  //       // Obtener las coordenadas de posición actual
  //       const {
  //         latitude,
  //         longitude,
  //         accuracy,
  //         altitude,
  //         heading,
  //         speed,
  //         altitudeAccuracy,
  //       } = position.coords;

  //       // Mapear los datos de Geolotes a la estructura deseada
  //       const regionData = items.map(item => ({
  //         Id: item.Id_Lote,
  //         Lote: item.Lote,
  //         CodigoLote: item.CodigoLote,
  //       }));

  //       // Crear el objeto de ubicación con todos los datos
  //       const locationData: ILocation = {
  //         latitude,
  //         longitude,
  //         accuracy,
  //         altitude,
  //         heading,
  //         speed,
  //         altitudeAccuracy,
  //         region: regionData,
  //       };

  //       // Actualizar el estado con los datos de ubicación
  //       setLocation(locationData);

  //       // Mostrar los datos en la consola
  //       console.log('Datos de ubicación:', locationData);
  //     },
  //     error => {
  //       console.error('Error al obtener la ubicación:', error);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  const geolotes = async () => {
    try {
      const lotes = await getRequest<IPoligono[]>(ApiEndpoints.Poligonos);

      if (lotes && lotes.length > 0) {
        // Si hay datos válidos, actualiza el estado y guárdalos localmente
        setPoligonos(lotes);

        // Guarda los datos en AsyncStorage
        await AsyncStorage.setItem('GeoLotes', JSON.stringify(lotes));
        console.log(
          'Datos guardados localmente:',
          JSON.stringify(lotes, null, 3),
        );
      } else {
        console.log('No se encontraron datos válidos para guardar.');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  return {
    geolotes,
    pointInRegion,
    poligonos,
  };
};
