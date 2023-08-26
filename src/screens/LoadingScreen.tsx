import React from 'react';
import {colores, styles} from '../theme/appTheme';
// @ts-expect-error
import AnimatedLoader from 'react-native-animated-loader';

export const LoadingScreen = () => {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor={colores.blanco}
      source={require('../assets/Loader/Loader-FullScreen.json')}
      animationStyle={{
        flex: 1,
        ...styles.centerItems,
        padding: '20%',
      }}
      animationType={'fade'}
      speed={1.75}></AnimatedLoader>
  );
};
