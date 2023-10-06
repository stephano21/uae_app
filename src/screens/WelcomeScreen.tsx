import React, {useContext} from 'react';
import {Image, Text} from 'react-native';
import {ButtonWithText} from '../components/ButtonWithText';
import {PermissionsContext} from '../context/PermissionsContext';
import {styles, colores, iconos} from '../theme/appTheme';
import {BaseScreen} from '../Template/BaseScreen';

export const WelcomeScreen = () => {
  const {askPermission} = useContext(PermissionsContext);
  return (
    <BaseScreen
      style={{
        ...styles.centerItems,
        paddingVertical: 200,
        paddingHorizontal: 90,
        justifyContent: 'space-evenly',
      }}>
      <Image
        source={require('../assets/logoUAE.png')}
        style={{
          height: 200,
          width: 300,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}></Image>
      <Text
        style={{
          textAlign: 'justify',
          color: colores.negro,
          maxWidth: 300,
          marginBottom: 30,
        }}>
        Por favor, permite acceder a tu ubicación, a la memoria interna y a la
        cámara de tu dispositivo para que tengas la mejor experiencia en la
        aplicación
      </Text>
      <ButtonWithText
        anyfunction={askPermission}
        icon={iconos.segurity}
        title={'Dar permisos'}></ButtonWithText>
    </BaseScreen>
  );
};
