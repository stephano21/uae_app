import React from 'react';
import {Modal, StyleProp, View, ViewStyle} from 'react-native';
import {colores, styles} from '../theme/appTheme';
import {BlurView} from '@react-native-community/blur';
export interface BaseModalProps {
  CloseFunction: () => void;
  isVisible: boolean;
}

interface Props extends BaseModalProps {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
  animationType?: 'none' | 'slide' | 'fade';
  isAlert?: boolean;
  showBlur?: boolean;
}

export const BaseModal = ({
  children,
  style,
  CloseFunction,
  isVisible = false,
  animationType = 'slide',
  isAlert = false,
  showBlur = false,
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
          {showBlur && (
          <BlurView
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
            blurAmount={2}
            blurType="material"></BlurView>
        )}
        {children}
      </View>
    </Modal>
  );
};
