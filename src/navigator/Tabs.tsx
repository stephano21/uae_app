import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {colores} from '../theme/appTheme';
import {Platform, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from '../screens/HomeScreen';
import {iconos} from '../theme/appTheme';
import {Proceso} from '../screens/Proceso';
import {NextScreen} from '../screens/NextScreen';
import {ReadingScreen} from '../screens/ReadingScreen';

const TabOptions = [
  {
    name: 'HomeScreen',
    title: 'Inicio',
    icon: iconos.home,
    component: NextScreen,
  },
  {
    name: 'Next2Screen',
    title: 'Lecturas',
    icon: iconos.ordenDeTrabajo,
    component: ReadingScreen,
  },
  {
    name: 'Next3Screen',
    title: 'Perfil',
    icon: iconos.perfilOutline,
    component: Proceso,
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
  const {width, height} = useWindowDimensions();

  return (
    <TabAndroid.Navigator
      sceneAnimationEnabled={true}
      barStyle={{backgroundColor: colores.blanco}}
      activeColor={colores.primario}
      inactiveColor={colores.plomo}>
      {TabOptions.map(({name, title, icon, component}, index) => (
        <TabAndroid.Screen
          key={index}
          name={name}
          options={{
            title,
            tabBarIcon: ({focused}) => (
              <Icon
                name={icon}
                size={28}
                color={focused ? colores.primario : colores.plomo}
              />
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
