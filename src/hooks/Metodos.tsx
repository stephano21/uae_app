import {useContext, useState} from 'react';
import {Geolotes, Plantas, Porfile} from './../interfaces/ApiInterface';
import {useRequest} from '../api/useRequest';
import {ApiEndpoints} from '../api/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {CheckInternetContext} from '../context/CheckInternetContext';
import {AlertContext} from '../context/AlertContext';
export const Metodos = () => {
  const {getRequest} = useRequest();
  const [poligonos, setPoligonos] = useState<Geolotes[]>([]);
  const [plantas, setPlantas] = useState<Plantas[]>([]);
  const [profile, setProfile] = useState<Porfile>();
  const {JWTInfo} = useContext(AuthContext);
  const {ShowAlert} = useContext(AlertContext);
  const {hasConection} = useContext(CheckInternetContext);

  const pointInRegion = (lat: number, lon: number, vertices: any[]) => {
    // Convertir las coordenadas a flotantes
    lat = parseFloat(lat.toString());
    lon = parseFloat(lon.toString());
    // Inicializar el contadora
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

  const geolotes = async (): Promise<Geolotes[]> => {
    return await getRequest<Geolotes[]>(ApiEndpoints.Poligonos).then(
      async lotes => {
        setPoligonos(lotes);
        await AsyncStorage.setItem('GeoLotes', JSON.stringify(lotes)).catch(e =>
          console.log(e),
        );
        return lotes; // Devolvemos el valor y  se usa inmediatamente.
      },
    );
  };
  const getPlantas = async () => {
    hasConection && JWTInfo
      ? await getRequest<Plantas[]>(ApiEndpoints.Plantas).then(
          async plantas => {
            setPlantas(plantas);
            await AsyncStorage.setItem(
              'Plantas',
              JSON.stringify(plantas),
            ).catch(() => setPlantas([]));
          },
        )
      : () => {};
  };

  const getPorfile = async () => {
    hasConection && JWTInfo
      ? await getRequest<Porfile>(ApiEndpoints.perfil, undefined, false)
          .then(setProfile)
          .catch(() => setProfile(undefined))
      : () => {};
  };

  return {
    getPlantas,
    getPorfile,
    geolotes,
    pointInRegion,
    poligonos,
    profile,
    plantas,
  };
};
