import React, {useContext} from 'react';
import {View, Keyboard, Text, Image, useWindowDimensions} from 'react-native';
import {colores} from '../theme/appTheme';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {ButtonWithText} from '../components/ButtonWithText';
import {InputForm} from '../components/InputForm';
import {BaseScreen} from '../Template/BaseScreen';
import {TextButton} from '../components/TextButton';
import {CommonActions, useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

let user = '';
let pass = '';

if (__DEV__) {
  user = 'jpalma@apptelink.com';
  pass = 'Prueba2023*+';
}

export const LoginScreen = () => {
  const {signIn} = useContext(AuthContext);
  const navigation = useNavigation();

  const {email, password, onChange} = useForm({
    email: user,
    password: pass,
  });

  const Login = () => {
    Keyboard.dismiss();
    signIn({correo: email, password});
  };

  return (
    <BaseScreen>
      <Image
        source={require('../assets/logoUAE.png')}
        style={{
          height: '30%',
          width: '80%',
          resizeMode: 'contain',
          alignSelf: 'center',
        }}></Image>
      <Text
        style={{
          color: colores.plomo,
          marginBottom: '15%',
          fontSize: 30,
          textAlign: 'center',
        }}>
        Texto Random
      </Text>
      <InputForm
        placeholder={'Usuario'}
        value={email}
        keyboard={'email-address'}
        onChange={value => onChange(value, 'email')}></InputForm>
      <InputForm
        placeholder={'Contraseña'}
        securetextentry={true}
        value={password}
        onChange={value => onChange(value, 'password')}></InputForm>
      <ButtonWithText
        anyfunction={() => Login()}
        title={'INICIAR SESIÓN'}></ButtonWithText>
      {/* <View
        style={{
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <TextButton
          title={'¿No tienes cuenta? ¡Registrate!'}
          anyfunction={() =>
            navigation.dispatch(CommonActions.navigate('RegisterScreen'))
          }></TextButton>
        <TextButton
          title={'Recuperar cuenta'}
          anyfunction={() =>
            navigation.dispatch(
              CommonActions.navigate('RecoveryPasswordScreen'),
            )
          }></TextButton>
      </View> */}
      <View
        style={{
          position: 'absolute',
          right: '10%',
          bottom: '10%',
        }}>
        <Text style={{color: colores.negro, fontWeight: 'bold'}}>
          Versión: {DeviceInfo.getVersion()}
        </Text>
      </View>
    </BaseScreen>
  );
};
