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
  color = colores.LocationBg,
  colorTexto = colores.primario,
  icon = '',
  width = 250,
  textSize = 20,
  tamañoIcon = 25,
  marginH,
  marginV = 14,
  alto = 60,
  margVText = 10,
  radio = 40,
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
        flexDirection: 'row',
        borderRadius: radio,
        width,
        //...styles.sombra,
      }}>
      {icon.length > 0 && (
        <Icon
          style={{
            borderRadius: 40,
            padding: '7.2%',
            marginRight: '10%',
            backgroundColor: '#000',
          }}
          name={icon}
          size={tamañoIcon}
          color={colorIcono}></Icon>
      )}
      <Text
        style={{
          ...styles.textButton,
          fontSize: textSize,
          color: colorTexto,
          marginVertical: margVText,
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
