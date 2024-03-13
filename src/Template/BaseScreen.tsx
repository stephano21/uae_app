import React, { useContext, useEffect } from 'react';
import { Animated, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useAnimation } from '../hooks/useAnimation';
import { colores, styles } from '../theme/appTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
interface Props {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
  isScroll?: boolean;
}
export const BaseScreen = ({ children, style = {}, isScroll = false }: Props) => {
  const isFocused = useIsFocused();

  const { fadeIn, opacity } = useAnimation();
  useEffect(() => {
    fadeIn(500);
  }, [isFocused]);
  return (
    <Animated.View
      style={{
        opacity,
        flex: 1,
        backgroundColor: colores.blanco,
      }}>
      {isScroll ? (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            padding: 20,
            ...(style as any),
          }}>
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: 'center',
            ...styles.globalmargin,
            ...(style as any),
          }}>
          {children}
        </View>
      )}
      <View style={{ ...MultimediaStyles.band }}>
        <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>
          V{DeviceInfo.getVersion()}
        </Text>
      </View>
    </Animated.View>
  );
};
const MultimediaStyles = StyleSheet.create({
  band: {
    backgroundColor: colores.appInfo,
    position: 'relative',
  },

});