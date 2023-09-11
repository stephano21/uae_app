import {Text} from 'react-native';
import _lotes from './../api/test.json';
import React, {useContext, useEffect, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {ButtonWithText} from '../components/ButtonWithText';
import {Metodos} from '../hooks/Metodos';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {colores} from '../theme/appTheme';
import {IPoligono} from '../interfaces/ApiInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckInternetContext} from '../context/CheckInternetContext';

export const NextScreen = () => {
  const {getLocation2, location, geolotes, poligonos} = Metodos();
  const [refreshLocation, setRefreshLocation] = useState<IPoligono[]>([]);
  const navigation = useNavigation();
  const {hasConection} = useContext(CheckInternetContext);

  useEffect(() => {
    if (hasConection) {
      geolotes();
      guardarLecturasEnLocal(poligonos);
    }
    cargarLecturasGuardadas();

    let refrescarUbicación: NodeJS.Timeout | null;
    refrescarUbicación = setInterval(() => {
      getLocation2(refreshLocation); // Llamada a getLocation2 con argumento
    }, 5000);

    return () => {
      if (refrescarUbicación) {
        clearInterval(refrescarUbicación);
      }
    };
  }, []);

  const guardarLecturasEnLocal = async (
    item: IPoligono[],
  ): Promise<boolean> => {
    try {
      await AsyncStorage.setItem('GeoLotes', JSON.stringify(item));

      return true; // Devuelve true si el guardado fue exitoso
    } catch (error) {
      console.error(error);
      return false; // Devuelve false si hubo un error al guardar
    }
  };

  const cargarLecturasGuardadas = async () => {
    try {
      const lotesGuardados = await AsyncStorage.getItem('GeoLotes');

      if (lotesGuardados) {
        const lotes: IPoligono[] = JSON.parse(lotesGuardados);
        setRefreshLocation(lotes);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(location);

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
