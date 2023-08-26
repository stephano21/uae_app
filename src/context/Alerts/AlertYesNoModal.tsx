import React from 'react';
import {View} from 'react-native';
import {colores, iconos} from '../../theme/appTheme';
import {AlertButton} from './AlertComponents/AlertButton';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {BaseModalProps} from '../../Template/BaseModal';
interface Props extends BaseAlertProps {
  OkFunction: () => void;
}
export const AlertYesNoModal = ({
  CloseFunction,
  OkFunction,
  title,
  message,
  isVisible = false,
}: Props) => {
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
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
