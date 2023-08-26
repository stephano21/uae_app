import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colores, styles} from '../theme/appTheme';

interface Props {
  action: () => void;
  icono: string;
  tituloItem: string;
  isfocused?: boolean;
}

export const StackOption = ({
  action,
  icono,
  tituloItem,
  isfocused = false,
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isfocused ? colores.primarioclaro : colores.blanco,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: colores.primarioclaro,
      }}
      onPress={() => action()}>
      <Icon
        name={icono}
        size={20}
        color={colores.primario}
        style={{marginRight: 10}}
      />
      <Text
        style={{
          ...styles.menuText,
          color: colores.primario,
          fontWeight: isfocused ? 'bold' : '300',
        }}>
        {tituloItem}
      </Text>
    </TouchableOpacity>
  );
};
