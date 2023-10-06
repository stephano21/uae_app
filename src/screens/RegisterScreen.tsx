import React, {useContext, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Keyboard, Text, useWindowDimensions} from 'react-native';
import {colores, iconos} from '../theme/appTheme';
import {InputForm} from '../components/InputForm';
import {useForm} from '../hooks/useForm';
import {ButtonWithText} from '../components/ButtonWithText';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {AlertContext} from '../context/AlertContext';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {ShowAlert} = useContext(AlertContext);
  const {
    Nombres,
    Apellidos,
    Identificacion,
    Usuario,
    Email,
    Password,
    CheckPassword,
    onChange,
  } = useForm({
    Nombres: '',
    Apellidos: '',
    Identificacion: '',
    Email: '',
    Usuario: '',
    Password: '',
    CheckPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const {signUp} = useContext(AuthContext);

  const solo3Decimales = (data: string, field: 'Identificacion') => {
    const regex = /^-?[0-9]+$/;
    if (regex.test(data) || data === '') {
      onChange(data, field);
    }
  };

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

    signUp({
      email: Email,
      password: Password,
      cedula: Identificacion,
      first_name: Nombres,
      last_name: Apellidos,
      username: Usuario,
    }).then(() => {
      navigation.dispatch(CommonActions.goBack());
    });
  };

  return (
    <BaseScreen isScroll={true} style={{justifyContent: 'center'}}>
      <Text style={{color: '#3333', fontSize: 22, marginBottom: '10%'}}>
        ¡Regístrese!
      </Text>
      <InputForm
        placeholder={'Nombres'}
        value={Nombres}
        keyboard={'email-address'}
        color={colores.plomo}
        onChange={value => onChange(value, 'Nombres')}></InputForm>
      <InputForm
        color={colores.plomo}
        placeholder={'Apellidos'}
        value={Apellidos}
        onChange={value => onChange(value, 'Apellidos')}></InputForm>
      <InputForm
        color={colores.plomo}
        placeholder={'Identificación'}
        value={Identificacion}
        keyboard="numeric"
        maxLength={10}
        onChange={value => solo3Decimales(value, 'Identificacion')}></InputForm>
      <InputForm
        color={colores.plomo}
        placeholder={'Nombre de usuario'}
        value={Usuario}
        onChange={value => onChange(value, 'Usuario')}></InputForm>
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
        width={width * 0.6}
        textSize={18}
        anyfunction={register}
        icon={iconos.perfil}
        title={'REGISTRAR CUENTA'}></ButtonWithText>
      <ButtonWithText
        width={width * 0.6}
        textSize={18}
        anyfunction={() => navigation.goBack()}
        icon={iconos.volver}
        title={'REGRESAR'}></ButtonWithText>
    </BaseScreen>
  );
};
