import {CommonActions, useNavigation} from '@react-navigation/native';
import {CheckInternetContext} from '../context/CheckInternetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Geolotes, ILocation, IPoligono} from '../interfaces/ApiInterface';
import React, {useContext, useEffect, useState} from 'react';
import {ButtonWithText} from '../components/ButtonWithText';
import Geolocation from 'react-native-geolocation-service';
import {AuthContext} from '../context/AuthContext';
import {BaseScreen} from '../Template/BaseScreen';
import {colores} from '../theme/appTheme';
import {Metodos} from '../hooks/Metodos';
import _lotes from './../api/test.json';
import {sleep} from '../helpers/sleep';
import {Text} from 'react-native';

export const NextScreen = () => {
  const navigation = useNavigation();
  const {JWTInfo} = useContext(AuthContext);
  const {geolotes, pointInRegion, poligonos} = Metodos();
  const {hasConection} = useContext(CheckInternetContext);
  const [refreshLocation, setRefreshLocation] = useState<IPoligono[]>([]);
  const [location, setLocation] = useState<ILocation>(); //definir un cuerpo o interfaz para location

  useEffect(() => {
    if (hasConection && JWTInfo.length > 0) {
      geolotes();
    }
    cargarLecturasGuardadas();

    let refrescarUbicación: NodeJS.Timeout | null;
    refrescarUbicación = setInterval(() => {
      getLocation2(); // Llamada a getLocation2 con argumento
    }, 5000);

    return () => {
      if (refrescarUbicación) {
        clearInterval(refrescarUbicación);
      }
    };
  }, []); // Añadir poligonos como dependencia

  const cargarLecturasGuardadas = async () => {
    try {
      const lotesGuardados = await AsyncStorage.getItem('GeoLotes');
      console.log('Datos guardados localmente:', lotesGuardados); // Agregar esta línea para verificar los datos guardados

      if (lotesGuardados) {
        const lotes: IPoligono[] = JSON.parse(lotesGuardados);
        console.log('Datos cargados correctamente:', lotes); // Agregar esta línea para verificar los datos cargados
        setRefreshLocation(lotes);
      } else {
        console.log('No se encontraron datos guardados en AsyncStorage');
      }
    } catch (error) {
      console.error('Error al cargar los datos desde AsyncStorage:', error);
    }
  };

  const getLocation2 = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const locationData: any = position.coords;
        locationData.region =
          refreshLocation.length > 0
            ? refreshLocation
            : poligonos
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
        //setIsFetching(false);
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <BaseScreen>
      {location && location.region ? (
        location?.region.map((a, index) => (
          <ButtonWithText
            key={index}
            anyfunction={() => {
              navigation.dispatch(CommonActions.navigate('LecturaScreen', {a}));
            }}
            title={a.Lote}
          />
        ))
      ) : (
        <Text style={{color: colores.negro}}>No hay regiones disponibles</Text>
      )}
    </BaseScreen>
  );
};
