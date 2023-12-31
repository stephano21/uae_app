import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colores} from '../../theme/appTheme';

interface Props {
  hasHeader?: boolean;
}

export const Background = ({hasHeader = true}: Props) => {
  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{
        height,
        width,
        position: 'absolute',
        zIndex: -10,
      }}>
      <Svg
        height="40%"
        width="100%"
        viewBox={'0 0 400 150'}
        style={{position: 'absolute', bottom: 0}}>
        <Path
          fill={colores.primario}
          d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
        />
      </Svg>
    </View>
  );
};
