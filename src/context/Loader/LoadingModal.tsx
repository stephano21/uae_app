import React from 'react';
import {colores, styles} from '../../theme/appTheme';
// @ts-expect-error
import AnimatedLoader from 'react-native-animated-loader';

export const LoadingModal = () => {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor={colores.darkLoader}
      source={require('../..//assets/Loader/Loader-Modal.json')}
      animationStyle={{
        flex: 1,
        ...styles.centerItems,
        //padding: '20%',
      }}
      animationType={'fade'}
      speed={1.75}></AnimatedLoader>
  );
};
