import React, {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {colores, iconos, styles} from '../theme/appTheme';

interface Props<T extends unknown> {
  catalog: T[];
  selectedItem: (itemSelected: T) => void;
  placeholder: string;
  textItem: (itemSelected: T) => string;
  reset?: boolean;
}

export const Selector = <T extends unknown>({
  catalog,
  selectedItem,
  placeholder,
  textItem,
  reset = false,
}: Props<T>) => {
  const selectorRef = useRef<SelectDropdown>();

  useEffect(() => {
    selectorRef.current?.reset();
  }, [reset]);
  return (
    <SelectDropdown
      ref={selectorref => (selectorRef.current = selectorref!)}
      data={catalog}
      onSelect={(item: T) => {
        selectedItem(item);
      }}
      onChangeSearchInputText={value => {}}
      defaultButtonText={placeholder}
      buttonStyle={{...styles.sombra, ...styles.selector}}
      dropdownStyle={{...styles.sombra}}
      renderDropdownIcon={() => (
        <Icon
          name={iconos.abajo}
          size={30}
          color={colores.darkTransparent}></Icon>
      )}
      buttonTextAfterSelection={(selectedItem: T, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return textItem(selectedItem);
      }}
      rowTextForSelection={(item: T, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return textItem(item);
      }}
    />
  );
};
