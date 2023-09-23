import {CommonActions, useNavigation} from '@react-navigation/native';
import {CheckInternetContext} from '../context/CheckInternetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Geolotes, ILocation} from '../interfaces/ApiInterface';
import React, {useContext, useEffect, useState} from 'react';
import {ButtonWithText} from '../components/ButtonWithText';
import Geolocation from 'react-native-geolocation-service';
import {AuthContext} from '../context/AuthContext';
import {BaseScreen} from '../Template/BaseScreen';
import {colores, iconos, styles} from '../theme/appTheme';
import {Metodos} from '../hooks/Metodos';
import {sleep} from '../helpers/sleep';
import {Text, View} from 'react-native';

export const NextScreen = () => {
  const navigation = useNavigation();
  const {JWTInfo} = useContext(AuthContext);
  const {geolotes, pointInRegion, getPlantas} = Metodos();
  const {hasConection} = useContext(CheckInternetContext);
  const [lotesMásRecientes, setLotesMásRecientes] = useState<Geolotes[]>([]);
  const [location, setLocation] = useState<ILocation | null>(null);

  const getLocation = () => {
    // console.log({
    //   tuales: lotesMásRecientes.length,
    // });lotesAc
    // Obtener la ubicación actual
    Geolocation.getCurrentPosition(
      async position => {
        const locationData: any = position.coords;
        // Filtrar los polígonos basados en la ubicación actual
        const filteredPoligonos = lotesMásRecientes.filter(item =>
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
        //console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    let _lotesMásRecientes: Geolotes[];
    const loadData = async () => {
      // 1. Los lotes más recientes se asumen de la caché.
      try {
        const asyncStorageItem = await AsyncStorage.getItem('GeoLotes');
        if (asyncStorageItem) {
          _lotesMásRecientes = JSON.parse(asyncStorageItem);
        } else {
          console.log('No se encontraron datos guardados en AsyncStorage');
        }
      } catch (error) {
        console.error('Error al cargar los datos desde AsyncStorage:', error);
      }
      // 2. Si hay acceso a la API, se descargarán los datos más recientes.
      if (hasConection && JWTInfo.length > 0) {
        try {
          _lotesMásRecientes = await geolotes();
          await getPlantas();
        } catch (error) {
          // Manejar cualquier error que ocurra en geolotes o getPlantas
          console.error('Error en geolotes o getPlantas:', error);
        }
      }
      setLotesMásRecientes(_lotesMásRecientes);
    };

    loadData();
  }, [hasConection]);
  // 3. Acá abajo se chequeará de acuerdo con las regiones más recientes.
  useEffect(() => {
    if (lotesMásRecientes.length === 0) {
      return;
    }
    getLocation(); // Se inicia actualizando la ubicación una vez tan pronto como se pueda.
    let refrescarUbicación: NodeJS.Timeout | null;
    refrescarUbicación = setInterval(async () => {
      getLocation();
    }, 5000);

    return () => {
      if (refrescarUbicación) {
        clearInterval(refrescarUbicación);
      }
    };
  }, [lotesMásRecientes]); // Añadir poligonos como dependencia

  return (
    <BaseScreen>
      <View style={{flex: 1, ...styles.centerItems}}>
        {location && location.region ? (
          location?.region.map((a, index) => (
            <ButtonWithText
              key={index}
              anyfunction={() => {
                navigation.dispatch(
                  CommonActions.navigate('PlantasScreen', {a}),
                );
              }}
              title={a.Lote}
            />
          ))
        ) : (
          <>
            <Text style={{color: colores.negro}}>
              No hay lotes cercanos disponibles
            </Text>
          </>
        )}
      </View>
    </BaseScreen>
  );
};
