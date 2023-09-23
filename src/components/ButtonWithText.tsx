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
  textSize?: number;
  tamañoIcon?: number;
  marginH?: number;
  marginV?: number;
  alto?: number;
  disabled?: boolean;
  colorIcono?: string;
  radio?: number;
  margVText?: number;
}

export const ButtonWithText = ({
  anyfunction,
  title,
  color = colores.primario,
  colorTexto = colores.blanco,
  icon = '',
  width = 250,
  textSize,
  tamañoIcon = 25,
  marginH,
  marginV = 14,
  alto,
  margVText = 10,
  radio = 10,
  disabled = false,
  colorIcono = colores.blanco,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={anyfunction}
      style={{
        height: alto,
        marginHorizontal: marginH,
        backgroundColor: color,
        marginVertical: marginV,
        ...styles.centerItems,
        alignSelf: 'center',
        flexDirection: 'row',
        ...styles.sombra,
        borderRadius: radio,
        width,
      }}>
      <Text
        style={{
          ...styles.textButton,
          fontSize: textSize,
          color: colorTexto,
          marginVertical: margVText,
        }}>
        {title}
      </Text>
      {icon.length > 0 && (
        <Icon
          style={{alignContent: 'flex-start'}}
          name={icon}
          size={tamañoIcon}
          color={colorIcono}></Icon>
      )}
    </TouchableOpacity>
  );
};
