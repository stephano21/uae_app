import React, {useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {colores, iconos, styles} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {LoaderContext} from '../context/LoaderContext';
import {sleep} from '../helpers/sleep';
import {AuthContext} from '../context/AuthContext';
import {AlertContext} from '../context/AlertContext';

interface Props {
  hasBack?: boolean;
  title?: string;
}

export const DrawerHeader = ({hasBack = false, title = ''}: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const {logOut} = useContext(AuthContext);
  const {ShowAlert} = useContext(AlertContext);
  let username = 'React Native';

  const logout = () => {
    ShowAlert('yesno', {
      title: 'Cerrar Sesión',
      message: '¿Desea cerrar sesión?',
      OkFunction: logOut,
    });
  };

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: colores.blanco,
        ...styles.centerItems,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {hasBack ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
          style={{height: 50, width: 50, ...styles.centerItems}}>
          <Icon name={iconos.atras} size={30} color={colores.primario} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {title.length === 0 ? (
        <Image
          source={require('../assets/banner.png')}
          style={{
            height: '100%',
            width: '50%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}></Image>
      ) : (
        <Text style={{...styles.textTitle, color: colores.primario}}>
          {title}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => logOut()}
        activeOpacity={0.6}
        style={{height: 50, width: 50, ...styles.centerItems}}>
        <Icon name={iconos.logout} size={30} color={colores.primario} />
      </TouchableOpacity>
    </View>
  );
};
