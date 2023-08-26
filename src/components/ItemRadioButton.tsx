import React from 'react';
import {Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {colores} from '../theme/appTheme';

interface Props {
  value: string;
  option: string;
  onPress: (data: string) => void;
}

export const ItemRadioButton = ({value, onPress, option}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '55%',
      }}>
      <RadioButton
        value={'uncheked'}
        color={colores.azul}
        status={value === option ? 'checked' : 'unchecked'}
        onPress={() => onPress(value)}
      />
      <Text style={{color: colores.negro}}>{value}</Text>
    </View>
  );
};
