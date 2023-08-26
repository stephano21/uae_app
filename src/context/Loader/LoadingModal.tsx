import React from 'react';
import {colores, styles} from '../../theme/appTheme';
import LottieView from 'lottie-react-native';

export const LoadingModal = () => {
  return (
    <LottieView
      //source={require('../..//assets/Loader/Loader-Modal.json')}
      source={require('../..//assets/Loader/Loader.json')}
      style={{flex: 1, backgroundColor: colores.darkTransparent}}
      speed={1.75}
      autoPlay
      loop></LottieView>
  );
};
