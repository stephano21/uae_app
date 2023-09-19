import { CommonActions, useNavigation } from '@react-navigation/native';
import { CheckInternetContext } from '../context/CheckInternetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Geolotes, ILocation } from '../interfaces/ApiInterface';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonWithText } from '../components/ButtonWithText';
import Geolocation from 'react-native-geolocation-service';
import { AuthContext } from '../context/AuthContext';
import { BaseScreen } from '../Template/BaseScreen';
import { colores, iconos } from '../theme/appTheme';
import { Metodos } from '../hooks/Metodos';
import { sleep } from '../helpers/sleep';
import { Text } from 'react-native';

export const NextScreen = () => {
  const navigation = useNavigation();
  const { JWTInfo } = useContext(AuthContext);
  const { geolotes, pointInRegion, poligonos, plantas, getPlantas } = Metodos();
  const { hasConection } = useContext(CheckInternetContext);
  const [refreshLocation, setRefreshLocation] = useState<Geolotes[]>([]);
  const [location, setLocation] = useState<ILocation | null>(null); //definir un cuerpo o interfaz para location
  const [Flag, setFlag] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await volverAcargar();
      await sleep(2);
      let refrescarUbicación: NodeJS.Timeout | null;
      refrescarUbicación = setInterval(async () => {
        await getLocation2(); // Llamada a getLocation2 con argumento
      }, 5000);

      return () => {
        if (refrescarUbicación) {
          clearInterval(refrescarUbicación);
        }
      };
    };

    loadData();
  }, [Flag]); // Añadir poligonos como dependencia

  const volverAcargar = async () => {
    console.log("reload..");
    if (hasConection && JWTInfo.length > 0) {
      try {
        await geolotes();
        await getPlantas();
      } catch (error) {
        // Manejar cualquier error que ocurra en geolotes o getPlantas
        console.error('Error en geolotes o getPlantas:', error);
      }
    }
    await cargarLecturasGuardadas();
  };


  const cargarLecturasGuardadas = async () => {
    try {
      const lotesGuardados = await AsyncStorage.getItem('GeoLotes');

      if (lotesGuardados) {
        const lotes: Geolotes[] = JSON.parse(lotesGuardados);
        setRefreshLocation(lotes);
      } else {
        console.log('No se encontraron datos guardados en AsyncStorage');
      }
    } catch (error) {
      console.error('Error al cargar los datos desde AsyncStorage:', error);
    }
  };
  const getLocation2 = async () => {
    console.log("getlocation...")
    console.log(Flag)
    if (Object.keys(poligonos).length <= 0 || Object.keys(refreshLocation).length <= 0)
      setFlag(false)
    console.log(Flag)
    // Definir la fuente de datos en función de la conexión
    if (
      Object.keys(poligonos).length > 0 ||
      Object.keys(refreshLocation).length > 0
    ) {
      const datos: Geolotes[] = hasConection ? poligonos : refreshLocation;
      // Obtener la ubicación actual
      Geolocation.getCurrentPosition(
        async position => {
          const locationData: any = position.coords;
          // Filtrar los polígonos basados en la ubicación actual
          const filteredPoligonos = datos.filter(item =>
            pointInRegion(
              locationData.latitude,
              locationData.longitude,
              item.geocoordenadas.map((item: any) => ({
                longitude: parseFloat(item.lng),
                latitude: parseFloat(item.lat),
              })),
            ),
          );

          // Mapear los polígonos filtrados a un arreglo de objetos
          const regionData = filteredPoligonos.map(item => ({
            Lote: item.Lote,
            Id: item.Id_Lote,
            Cod: item.CodigoLote,
          }));

          // Asignar la propiedad 'region' en locationData con los datos mapeados
          locationData.region = regionData;

          // Actualizar el estado con los datos de ubicación
          setLocation(locationData);
        },
        error => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  return (
    <BaseScreen>
      {location && location.region ? (
        location?.region.map((a, index) => (
          <ButtonWithText
            key={index}
            anyfunction={() => {
              navigation.dispatch(CommonActions.navigate('PlantasScreen', { a }));
            }}
            title={a.Lote}
          />
        ))
      ) : (
        <>
          <Text style={{ color: colores.negro }}>
            No hay lotes cercanos disponibles
          </Text>
          {/* <ButtonWithText
            title="¿No hay datos? Carga de nuevo"
            icon={iconos.recargar}
            anyfunction={volverAcargar}
          /> */}
        </>
      )}
    </BaseScreen>
  );
};
