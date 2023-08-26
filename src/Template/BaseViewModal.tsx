import React, {useState} from 'react';
import {View} from 'react-native';
import {BaseModal, BaseModalProps} from './BaseModal';
import {ButtonWithText} from '../components/ButtonWithText';
import {colores, styles} from '../theme/appTheme';
import {ScrollView} from 'react-native-gesture-handler';

interface Props extends BaseModalProps {
  children: JSX.Element | JSX.Element[];
  isScroll?: boolean;
}

export const BaseViewModal = ({
  CloseFunction,
  isVisible,
  children,
  isScroll = false,
}: Props) => {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  return (
    <BaseModal CloseFunction={CloseFunction} isVisible={isVisible}>
      {isScroll ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colores.blanco,
            //flex: 1,
            ...styles.sombra,
            padding: 20,
          }}
          onLayout={event =>
            setDimensions({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            })
          }>
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: colores.blanco,
            ...styles.globalmargin,
            ...styles.sombra,
          }}
          onLayout={event =>
            setDimensions({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            })
          }>
          {children}
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          top: dimensions.height - 50,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ButtonWithText
            color={colores.rojo}
            anyfunction={CloseFunction}
            width={100}
            title={'Cerrar'}></ButtonWithText>
        </View>
      </View>
    </BaseModal>
  );
};
