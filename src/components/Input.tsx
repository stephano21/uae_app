import React from 'react';
import {View, KeyboardTypeOptions, TextInputProps} from 'react-native';
import {styles, colores} from '../theme/appTheme';
interface Props {
  placeholder: string;
  value: string;
  keyboard?: KeyboardTypeOptions;
  autocapitalize?: TextInputProps['autoCapitalize'];
  securetextentry?: boolean;
  isEditable?: boolean;
  onChange: (field: string, text?: string) => void;
}
import {TextInput} from 'react-native-paper';
export const Input = ({
  placeholder,
  value,
  keyboard = 'email-address',
  securetextentry = false,
  onChange,
  autocapitalize = 'none',
  isEditable = true,
}: Props) => {
  return (
    <View
      style={{
        ...styles.inputField,
      }}>
      <TextInput
        style={{
          color: isEditable ? colores.negro : colores.plomo,
        }}
        mode={'outlined'}
        activeOutlineColor={colores.darkTransparent}
        label={placeholder}
        selectionColor={colores.rojo}
        placeholderTextColor={colores.plomo}
        autoCapitalize={autocapitalize}
        editable={isEditable}
        autoCorrect={false}
        value={value}
        onChangeText={field => onChange(field)}
        secureTextEntry={securetextentry}
        keyboardType={
          securetextentry === true ? undefined : keyboard
        }></TextInput>
    </View>
  );
};
