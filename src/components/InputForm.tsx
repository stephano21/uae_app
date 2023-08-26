import React, {useState} from 'react';
import {KeyboardTypeOptions, useWindowDimensions} from 'react-native';
import {TextInput} from 'react-native-paper';

import {colores, iconos} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  placeholder: string;
  color?: string;
  onChange: (value?: any) => void;
  value?: string;
  isEditable?: boolean;
  securetextentry?: boolean;
  keyboard?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
  colorBase?: string;
  ancho?: number;
  minLength?: number;
}

export const InputForm = ({
  placeholder,
  color = colores.primario,
  value = '',
  onChange,
  isEditable = true,
  keyboard = 'default',
  maxLength = 100,
  minLength = 0,
  securetextentry = false,
  multiline = false,
  colorBase = colores.blanco,
  ancho = 0.85,
}: Props) => {
  const {width} = useWindowDimensions();
  const [isPasswordSecure, setisPasswordSecure] = useState(securetextentry);

  return (
    <TextInput
      mode={'flat'}
      multiline={multiline}
      style={{
        verticalAlign: 'top',
        width: width * ancho,
        //height: 50,
        fontSize: 18,
        backgroundColor: colorBase,
        marginVertical: 2,
        maxWidth: 400,
      }}
      right={
        securetextentry && (
          <TextInput.Icon
            icon={() => (
              <Icon
                name={isPasswordSecure ? iconos.ojo : iconos.ojotachado}
                size={25}
                color={color}></Icon>
            )}
            onPress={() =>
              setisPasswordSecure(!isPasswordSecure)
            }></TextInput.Icon>
        )
      }
      maxLength={maxLength}
      activeUnderlineColor={color}
      outlineColor={color}
      underlineColor={color}
      selectionColor={colores.primarioclaro}
      activeOutlineColor={color}
      label={placeholder}
      autoCapitalize={
        keyboard === 'email-address' || securetextentry ? 'none' : undefined
      }
      editable={isEditable}
      value={value}
      secureTextEntry={isPasswordSecure}
      onChangeText={value => onChange(value)}
      keyboardType={keyboard}
      underlineColorAndroid={color}></TextInput>
  );
};
