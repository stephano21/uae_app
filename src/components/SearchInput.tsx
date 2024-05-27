import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { colores } from '../theme/appTheme';

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

  const calculateSimilarity = (text: string, query: string): number => {
    if (text.startsWith(query)) return 1;
    if (text.includes(query)) return 0.5;
    return 0;
  };

  const filterItems = () => {
    if (deboncedValue.length < 2) {
      return result([]);
    }

    const lowercasedValue = deboncedValue.trim().toLowerCase();

    const filteredItems = catalog
      .filter(item => {
        const text = textCompare(item);
        return text.some(t =>
          t.trim().toLowerCase().includes(lowercasedValue)
        );
      })
      .map(item => {
        const text = textCompare(item);
        const similarityScore = Math.max(
          ...text.map(t => calculateSimilarity(t.trim().toLowerCase(), lowercasedValue))
        );
        return { item, similarityScore };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .map(({ item }) => item);

    result(filteredItems);
  };

  useEffect(() => {
    filterItems();
  }, [deboncedValue, catalog]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colores.plomo}
          style={styles.textInput}
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
  container: {
    width: '100%',
    marginBottom: 10,
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
    width: '90%',
    top: Platform.OS === 'ios' ? 0 : 2,
    color: 'black',
  },
});
