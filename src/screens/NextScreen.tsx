import {Text} from 'react-native';
import _lotes from './../api/test.json';
import React, {useEffect} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {ButtonWithText} from '../components/ButtonWithText';
import {Metodos} from '../hooks/Metodos';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {colores} from '../theme/appTheme';

export const NextScreen = () => {
  const {getLocation2, location} = Metodos();
  const navigation = useNavigation();

  useEffect(() => {
    getLocation2();
  }, []);

  return (
    <BaseScreen>
      {location && location.region ? (
        location?.region.map((a, index) => (
          <ButtonWithText
            key={index}
            anyfunction={() =>
              navigation.dispatch(CommonActions.navigate('LecturaScreen', {a}))
            }
            title={a.Lote}
          />
        ))
      ) : (
        <Text style={{color: colores.negro}}>No hay regiones disponibles</Text>
      )}
    </BaseScreen>
  );
};
