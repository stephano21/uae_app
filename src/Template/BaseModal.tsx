import React from 'react';
import {Modal, StyleProp, View, ViewStyle} from 'react-native';
import {colores, styles} from '../theme/appTheme';

export interface BaseModalProps {
  CloseFunction: () => void;
  isVisible: boolean;
}

interface Props extends BaseModalProps {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
  animationType?: 'none' | 'slide' | 'fade';
  isAlert?: boolean;
}

export const BaseModal = ({
  children,
  style,
  CloseFunction,
  isVisible = false,
  animationType = 'slide',
  isAlert = false,
}: Props) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={() => (isAlert ? {} : CloseFunction())}>
      <View
        style={{
          ...styles.globalmargin,
          backgroundColor: colores.darkTransparent,
          ...(style as any),
        }}>
        {children}
      </View>
    </Modal>
  );
};
