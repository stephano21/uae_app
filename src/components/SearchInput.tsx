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

interface Props<T extends unknown> {
  placeholder: string;
  catalog: T[];
  textCompare: (item: T) => string[];
  result: (filteredItems: T[]) => void;
  style?: StyleProp<ViewStyle>;
  keyBoard?: KeyboardTypeOptions;
}

export const SearchInput = <T extends unknown>({
  placeholder,
  catalog,
  textCompare,
  result,
  style,
  keyBoard = 'default',
}: Props<T>) => {
  const [textValue, setTextValue] = useState('');
  const deboncedValue = useDebouncedValue(textValue);
  const filterItems = () => {
    if (deboncedValue.length < 2) {
      return result(catalog);
    }
    result(
      catalog.filter(item => {
        const text = textCompare(item);
        return text.some(t =>
          t.trim().toLowerCase().includes(deboncedValue.trim().toLowerCase()),
        );
      }),
    );
  };

  useEffect(() => {
    filterItems();
  }, [deboncedValue, catalog]);

  return (
    <View
      style={{
        width: '100%',
        marginBottom: 10,
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
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
          keyboardType={keyBoard}
        />
        <Icon name="search-outline" color="grey" size={25} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: '90%',
  },
});
