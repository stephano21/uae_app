import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {colores, iconos, styles} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  actions?: React.JSX.Element[];
}

export const StackHeader = ({title, actions}: Props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: colores.primario,
        ...styles.centerItems,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}
        style={{height: 50, width: 50, ...styles.centerItems}}
      >
        <Icon name={iconos.atras} size={30} color={colores.blanco} />
      </TouchableOpacity>
      <Text style={{...styles.textTitle}}>{title}</Text>
      <View style={{maxHeight: 50}}>
        {actions && actions?.length > 0
          && actions?.map((action, i) => <View key={i} style={{...styles.centerItems}}>{action}</View>)
        }
      </View>
    </View>
  );
};
