import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {colores, styles} from '../../theme/appTheme';
import {BaseModal, BaseModalProps} from '../../Template/BaseModal';
export type AlertTitleType =
  | 'Aviso'
  | 'Error'
  | 'Exito'
  | 'Informacion'
  | 'Cerrar Sesión'
  | 'Guardado'
  | 'Enviado';

export interface BaseAlertProps extends BaseModalProps {
  title?: AlertTitleType;
  message: string;
  children?: JSX.Element | JSX.Element[];
}
export const AlertBaseModal = ({
  title = 'Aviso',
  message,
  children,
  isVisible = false,
  CloseFunction,
}: BaseAlertProps) => {
  const {width} = useWindowDimensions();
  return (
    <BaseModal
      isAlert={true}
      style={{...styles.centerItems}}
      CloseFunction={CloseFunction}
      isVisible={isVisible}
      animationType="fade">
      <View
        style={{
          backgroundColor: colores.blanco,
          ...styles.sombra,
          borderRadius: 20,
          ...styles.centerItems,
          alignItems: 'flex-start',
          padding: 20,
          width: width * 0.8,
          maxWidth: 500,
        }}>
        <Text
          style={{
            ...styles.textTitle,
            marginVertical: 5,
            textAlign: 'left',
            color: colores.plomo,
          }}>
          {title}
        </Text>
        <Text
          style={{
            ...styles.textButton,
            marginVertical: 10,
            color: colores.negro,
          }}>
          {message}
        </Text>
        {children}
      </View>
    </BaseModal>
  );
};
