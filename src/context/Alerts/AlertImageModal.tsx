import React from 'react';
import {View, useWindowDimensions, Image} from 'react-native';
import {colores, iconos, styles} from '../../theme/appTheme';
import {AlertButton} from './AlertComponents/AlertButton';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {BaseModalProps} from '../../Template/BaseModal';

interface Props extends BaseAlertProps {
  OkFunction: () => void;
  imagePath: string;
}
export const AlertImageModal = ({
  CloseFunction,
  OkFunction,
  title,
  message,
  imagePath,
  isVisible = false,
}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <View style={{alignSelf: 'center', ...styles.sombra, overflow: 'hidden'}}>
        <Image
          source={{
            uri: imagePath,
          }}
          style={{
            width: width / 2,
            height: width / 1.5,
          }}></Image>
      </View>
      <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
        <AlertButton
          icono={iconos.equis}
          color={colores.rojo}
          anyFunction={CloseFunction}></AlertButton>
        <AlertButton
          icono={iconos.visto}
          anyFunction={OkFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
