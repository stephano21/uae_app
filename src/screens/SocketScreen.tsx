import React, {useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Text} from 'react-native';
import {colores, styles} from '../theme/appTheme';
import {InputForm} from '../components/InputForm';
import {ButtonWithText} from '../components/ButtonWithText';

export const SocketScreen = () => {
  const [mensaje, setmensaje] = useState('');

  return (
    <BaseScreen>
      <Text style={{...styles.textBold, color: colores.plomo}}>
        Socket with SignalR
      </Text>
      <InputForm
        placeholder={'Mensaje'}
        onChange={setmensaje}
        value={mensaje}
      />
      <ButtonWithText anyfunction={() => {}} title={'Enviar'} />
    </BaseScreen>
  );
};
