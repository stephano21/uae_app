import React, {useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {colores, iconos, styles} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
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
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
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
            width: '70%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}></Image>
      ) : (
        <Text style={{...styles.textTitle, color: colores.primario}}>
          {title}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => logout()}
        activeOpacity={0.6}
        style={{height: 50, width: 50, ...styles.centerItems}}>
        <Icon name={iconos.logout} size={30} color={colores.primario} />
      </TouchableOpacity>
    </View>
  );
};
