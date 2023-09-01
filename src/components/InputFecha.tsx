import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {colores, iconos} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';

interface Props {
  placeholder?: string;
  color?: string;
  ancho?: number;
  colorBase?: string;
  onDateSelected: (date: Date) => void;
}

export const InputFecha = ({
  placeholder,
  color = colores.primario,
  ancho = 0.85,
  colorBase = colores.blanco,
  onDateSelected,
}: Props) => {
  const {width} = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    onDateSelected(date);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return formattedDate.replace(/\//g, '/').replace(',', '');
  };

  return (
    <>
      <TextInput
        mode="flat"
        style={{
          verticalAlign: 'top',
          width: width * ancho,
          fontSize: 18,
          backgroundColor: colorBase,
          marginVertical: 5,
          maxWidth: 400,
        }}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon name={iconos.agenda} size={25} color={colores.primario} />
            )}
            onPress={() => showDatePickerModal()}
          />
        }
        activeUnderlineColor={color}
        outlineColor={color}
        underlineColor={color}
        selectionColor={color}
        activeOutlineColor={color}
        cursorColor={colores.primario}
        label={placeholder}
        value={selectedDate ? formatDate(selectedDate) : ''}
        editable={false}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={handleDateChange}
        onCancel={hideDatePickerModal}
      />
    </>
  );
};
