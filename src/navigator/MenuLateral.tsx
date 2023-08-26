import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Image, Text, View} from 'react-native';
import {styles, colores, iconos} from '../theme/appTheme';
import {AuthContext} from '../context/AuthContext';
import {StackOption} from './StackOption';
import {DrawerHeader} from './DrawerHeader';
import {AlertContext} from '../context/AlertContext';
import {NextScreen} from '../screens/NextScreen';
import {Tabs} from './Tabs';
import {RayadosScreen} from '../screens/RayadosScreen';
import {SocketScreen} from '../screens/SocketScreen';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      defaultStatus="open"
      drawerContent={props => <MenuInterno {...props} />}
      screenOptions={{
        headerShown: true,
        //drawerType: width >= 768 ? 'permanent' : 'front',
        header: ({route: {params}}: any) => (
          <DrawerHeader
            title={params !== undefined ? params.title : ''}></DrawerHeader>
        ),
      }}>
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="NextScreen" component={NextScreen} />
      <Drawer.Screen name="RayadosScreen" component={RayadosScreen} />
      <Drawer.Screen name="SocketScreen" component={SocketScreen} />
    </Drawer.Navigator>
  );
};

//#region Menu Interno
const MenuItems = [
  {
    icon: iconos.home,
    name: 'Inicio',
    title: '',
    route: 'Tabs',
  },
  {
    icon: iconos.ubicacion,
    name: 'Next Screen',
    title: 'Next Screen',
    route: 'NextScreen',
  },
  {
    icon: iconos.imagen,
    name: 'Rayados',
    title: 'Rayados',
    route: 'RayadosScreen',
  },
  {
    icon: iconos.advertencia,
    name: 'Socket',
    title: 'Socket',
    route: 'SocketScreen',
  },
];

const MenuInterno = ({navigation, state}: DrawerContentComponentProps) => {
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
    <DrawerContentScrollView
      style={{
        backgroundColor: colores.blanco,
        ...styles.sombra,
        borderRadius: 0,
      }}>
      {/* Parte del avatar */}
      <View style={{...styles.avatarContainer}}>
        <View style={{...styles.sombra, ...styles.avatar, overflow: 'hidden'}}>
          <Image
            style={{
              ...styles.avatar,
              backgroundColor: colores.blanco,
              resizeMode: 'contain',
            }}
            source={require('../assets/logoUAE.png')}></Image>
          <View
            style={{
              flexDirection: 'row',
              ...styles.centerItems,
            }}></View>
        </View>
        <Text
          style={{...styles.textButton, color: colores.primario, margin: 0}}>
          Hola,{' '}
          <Text
            style={{
              ...styles.textButtonBold,
              color: colores.primario,
              padding: 0,
            }}>
            {username}
          </Text>
        </Text>
      </View>
      {/* Opciones de menu */}
      <View style={styles.menuContainer}>
        {MenuItems.map(({route, title, name, icon}, index) => (
          <StackOption
            key={index}
            action={() => navigation.navigate(route, {title})}
            icono={icon}
            tituloItem={name}
            isfocused={
              state.routes.findIndex(e => e.name === route) === state.index
            }></StackOption>
        ))}
        <StackOption
          action={() => logout()}
          icono={iconos.logout}
          tituloItem={'Cerrar sesión'}></StackOption>
      </View>
    </DrawerContentScrollView>
  );
};

//#endregion
