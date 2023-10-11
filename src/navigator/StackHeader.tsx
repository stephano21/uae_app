import React, {useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {colores, iconos, styles} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import appinfo from '../../package.json';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../context/ThemeContext';

interface Props {
  title: string;
}

export const StackHeader = ({title}: Props) => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: colors.background,
        ...styles.centerItems,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}
        style={{height: 50, width: 50, ...styles.centerItems}}>
        <Icon name={iconos.atras} size={30} color={colores.blanco} />
      </TouchableOpacity>
      <Text style={{...styles.textTitle}}>{title}</Text>
      <View style={{height: 50, width: 50}}></View>
    </View>
  );
};
