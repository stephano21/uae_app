import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {colores} from '../theme/appTheme';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from '../screens/HomeScreen';
import {NextScreen} from '../screens/NextScreen';
import {iconos} from '../theme/appTheme';

const TabOptions = [
  {
    name: 'HomeScreen',
    title: 'Inicio',
    icon: iconos.home,
    component: HomeScreen,
  },
  {
    name: 'NextScreen',
    title: 'Busqueda',
    icon: iconos.lupa,
    component: NextScreen,
  },
  {
    name: 'Next2Screen',
    title: 'Favoritos',
    icon: iconos.favorito,
    component: NextScreen,
  },
  {
    name: 'Next3Screen',
    title: 'Perfil',
    icon: 'aperture-outline',
    component: NextScreen,
  },
];

export const Tabs = () => {
  return Platform.OS === 'ios' ? (
    <TabsIOS></TabsIOS>
  ) : (
    <TabsAndroid></TabsAndroid>
  );
};

const TabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
  return (
    <TabAndroid.Navigator
      sceneAnimationEnabled={true}
      barStyle={{backgroundColor: colores.blanco}}
      activeColor={colores.secundario}
      inactiveColor={colores.plomo}>
      {TabOptions.map(({name, title, icon, component}, index) => (
        <TabAndroid.Screen
          key={index}
          name={name}
          options={{
            title,
            tabBarIcon: () => (
              <Icon name={icon} size={25} color={colores.secundario} />
            ),
          }}
          component={component}
        />
      ))}
    </TabAndroid.Navigator>
  );
};

const TabIOS = createBottomTabNavigator();

const TabsIOS = () => {
  return (
    <TabIOS.Navigator sceneContainerStyle={{backgroundColor: 'white'}}>
      {TabOptions.map(({name, title, icon, component}, index) => (
        <TabIOS.Screen
          key={index}
          name={name}
          options={{
            title,
            tabBarIcon: () => (
              <Icon name={icon} size={25} color={colores.secundario} />
            ),
          }}
          component={component}
        />
      ))}
    </TabIOS.Navigator>
  );
};
