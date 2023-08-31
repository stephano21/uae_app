import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {colores, styles} from '../theme/appTheme';
import {BaseScreen} from '../Template/BaseScreen';

export const Proceso = () => {
  const {width} = useWindowDimensions();
  return (
    <BaseScreen>
      <View style={{flex: 1, ...styles.centerItems}}>
        <Text style={{color: colores.primario, fontSize: width * 0.07}}>
          Pantalla en espera.
        </Text>
      </View>
    </BaseScreen>
  );
};
