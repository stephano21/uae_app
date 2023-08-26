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
}

export const InputForm = ({
  placeholder,
  color = colores.primario,
  value = '',
  onChange,
  isEditable = true,
  keyboard = 'default',
  maxLength = 100,
  securetextentry = false,
}: Props) => {
  const {height, width} = useWindowDimensions();
  const [isPasswordSecure, setisPasswordSecure] = useState(securetextentry);

  return (
    <TextInput
      mode={'flat'}
      style={{
        width: width - 100,
        //height: 50,
        fontSize: 18,
        backgroundColor: colores.blanco,
        marginVertical: 5,
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
      selectionColor={color}
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
