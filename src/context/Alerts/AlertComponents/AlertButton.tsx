import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colores, iconos, styles} from '../../../theme/appTheme';

interface Props {
  anyFunction: ((obj?: any) => void) | ((obj?: any) => Promise<void>);
  color?: string;
  icono?: string;
}

export const AlertButton = ({
  anyFunction,
  color = colores.success,
  icono = iconos.visto,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => anyFunction()}
      style={{
        backgroundColor: color,
        marginTop: 20,
        marginLeft: 15,
        ...styles.centerItems,
        ...styles.sombra,
        borderRadius: 25,
        alignSelf: 'center',
        height: 40,
        width: 40,
      }}>
      {/* <Text style={styles.textButtonBold}>{title}</Text> */}
      <Icon name={icono} size={25} color={colores.blanco}></Icon>
    </TouchableOpacity>
  );
};
