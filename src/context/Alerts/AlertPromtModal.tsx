import React from 'react';
import {View} from 'react-native';
import {colores, iconos} from '../../theme/appTheme';
import {AlertButton} from './AlertComponents/AlertButton';
import {InputAlert} from './AlertComponents/InputAlert';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {BaseModalProps} from '../../Template/BaseModal';

interface Props extends BaseAlertProps {
  OkFunction: () => void;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}
export const AlertPromtModal = ({
  CloseFunction,
  OkFunction,
  value,
  title,
  message,
  onChange,
  placeholder = 'Su informacion',
  isVisible = false,
}: Props) => {
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <InputAlert
        placeholder={placeholder}
        value={value}
        onChange={value => onChange(value)}></InputAlert>
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
