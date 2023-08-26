import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {colores} from '../theme/appTheme';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder: string;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
}

export const SearchInputApi = ({
  style,
  onDebounce,
  placeholder,
  value = '',
  keyboardType = 'default',
}: Props) => {
  const [textValue, setTextValue] = useState(value);

  const deboncedValue = useDebouncedValue(textValue);

  useEffect(() => {
    onDebounce(deboncedValue);
  }, [deboncedValue]);

  return (
    <View
      style={{
        width: '100%',
        marginBottom: '3%',
        ...(style as any),
      }}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colores.plomo}
          style={{
            ...styles.textInput,
            top: Platform.OS === 'ios' ? 0 : 2,
            color: 'black',
          }}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" color="grey" size={25} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red'
  },
  textBackground: {
    backgroundColor: colores.plomoclaro,
    borderRadius: 50,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    fontSize: 16,
  },
});
