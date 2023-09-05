import React, {useContext, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Keyboard, Text} from 'react-native';
import {colores} from '../theme/appTheme';
import {InputForm} from '../components/InputForm';
import {useForm} from '../hooks/useForm';
import {ButtonWithText} from '../components/ButtonWithText';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {AlertContext} from '../context/AlertContext';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const {ShowAlert} = useContext(AlertContext);
  const {
    // Nombres,
    // Apellidos,
    // Identificacion,
    // Telefono,
    Email,
    Password,
    CheckPassword,
    onChange,
  } = useForm({
    // Nombres: '',
    // Apellidos: '',
    // Identificacion: '',
    // Telefono: '',
    Email: '',
    Password: '',
    CheckPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const {signUp} = useContext(AuthContext);

  const register = () => {
    Keyboard.dismiss();
    if (Password !== CheckPassword) {
      setPasswordsMatch(false); // Actualiza el estado para mostrar un mensaje de error
      ShowAlert('default', {
        message: 'Las contraseñas no coinciden.',
        title: 'Error',
      });
      return;
    }

    if (Password.length < 8) {
      ShowAlert('default', {
        message: 'Las contraseñas deben tener mínimo 8 caracteres',
        title: 'Aviso',
      });

      return;
    }

    signUp({correo: Email, password: Password});
  };

  return (
    <BaseScreen isScroll={true} style={{justifyContent: 'center'}}>
      <Text style={{color: colores.plomo, fontSize: 22, marginBottom: '10%'}}>
        ¡Regístrese!
      </Text>
      {/* <InputForm
        placeholder={'Nombres'}
        value={Nombres}
        keyboard={'email-address'}
        color={colores.plomo}
        onChange={value => onChange(value, 'Nombres')}></InputForm>
      <InputForm
        color={colores.plomo}
        placeholder={'Apellidos'}
        securetextentry={true}
        value={Apellidos}
        onChange={value => onChange(value, 'Apellidos')}></InputForm>
      <ButtonWithText
        color={colores.secundario}
        anyfunction={() => {}}
        title={'TOMAR FOTO DE PERFIL'}></ButtonWithText>
      <InputForm
        color={colores.plomo}
        placeholder={'Identificación'}
        securetextentry={true}
        value={Identificacion}
        onChange={value => onChange(value, 'Identificacion')}></InputForm>
      <InputForm
        color={colores.plomo}
        placeholder={'Número de teléfono'}
        securetextentry={true}
        value={Telefono}
        onChange={value => onChange(value, 'Telefono')}></InputForm> */}
      <InputForm
        color={colores.plomo}
        placeholder={'Email'}
        keyboard={'email-address'}
        value={Email}
        onChange={value => onChange(value, 'Email')}></InputForm>
      <InputForm
        color={colores.plomo}
        placeholder={'Contraseña'}
        securetextentry={true}
        value={Password}
        onChange={value => onChange(value, 'Password')}></InputForm>
      <InputForm
        color={colores.plomo}
        placeholder={'Confirmar Contraseña'}
        securetextentry={true}
        value={CheckPassword}
        onChange={value => onChange(value, 'CheckPassword')}></InputForm>
      <ButtonWithText
        anyfunction={register}
        title={'REGISTRAR CUENTA'}></ButtonWithText>
      <ButtonWithText
        anyfunction={() => navigation.goBack()}
        title={'REGRESAR'}></ButtonWithText>
    </BaseScreen>
  );
};
