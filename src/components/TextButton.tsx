import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {colores, styles} from '../theme/appTheme';
interface Props {
  title: string;
  anyfunction: () => void;
  color?: string;
}
export const TextButton = ({
  title,
  anyfunction,
  color = colores.secundario,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{marginVertical: '1%'}}
      onPress={() => anyfunction()}>
      <Text style={{...styles.textButton, color: color}}>{title}</Text>
    </TouchableOpacity>
  );
};
