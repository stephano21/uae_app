import React from 'react';
import {colores, styles} from '../theme/appTheme';
import LottieView from 'lottie-react-native';

export const LoadingScreen = () => {
  return (
    <LottieView
      source={require('../assets/Loader/Loader-FullScreen.json')}
      speed={1.75}
      autoPlay
      style={{flex: 1, backgroundColor: colores.blanco}}
      loop></LottieView>
  );
};
