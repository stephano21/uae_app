import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colores, styles} from '../theme/appTheme';

interface Props {
  anyfunction: (() => void) | (() => Promise<void>);
  title: string;
  color?: string;
  colorTexto?: string;
  icon?: string;
  width?: number;
}

export const ButtonWithText = ({
  anyfunction,
  title,
  color = colores.primario,
  colorTexto = colores.blanco,
  icon = '',
  width = 250,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={anyfunction}
      style={{
        backgroundColor: color,
        marginVertical: 14,
        ...styles.centerItems,
        ...styles.sombra,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        width,
      }}>
      {icon.length > 0 && (
        <Icon name={icon} size={25} color={colores.blanco}></Icon>
      )}
      <Text
        style={{...styles.textButton, color: colorTexto, textAlign: 'center'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
