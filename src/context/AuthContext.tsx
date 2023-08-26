import React, {createContext, useContext, useEffect, useState} from 'react';
import queryString from 'query-string';
import {LoginData} from '../interfaces/UserInterface';
import {AlertContext} from './AlertContext';
import {sleep} from '../helpers/sleep';
import {useStorage} from '../data/useStorage';
import {useRequest} from '../api/useRequest';
import {TokenResponse} from '../interfaces/BaseApiInterface';

type AuthContextProps = {
  status: StatusTypes;
  //signUp: (obj: CreateUser, pass: string) => Promise<void>;
  signIn: (obj: LoginData) => Promise<void>;
  logOut: () => void;
  token: string;
};

type StatusTypes = 'checking' | 'authenticated' | 'notauthenticated';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const {ShowAlert} = useContext(AlertContext);
  const {CheckToken, GetToken, SaveToken, RemoveAllData} = useStorage();
  const {postRequestToken} = useRequest();
  const [status, setstatus] = useState<StatusTypes>('checking');
  const [token, settoken] = useState('');

  useEffect(() => {
    checkToken();
    /* AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkVersionApp();
    }); */
  }, []);

  /**
   * Checks if there is a token in local storage and attempts to authenticate with it
   * @returns void
   */

  const checkToken = async (): Promise<void> => {
    await sleep(2);
    await CheckToken().then(check =>
      check
        ? GetToken().then(token => {
            settoken(token);
            setstatus('authenticated');
          })
        : setstatus('notauthenticated'),
    );
  };

  /*   const checkVersionApp = async () => {
    setIsFetching(true);
    await ApiRequest.get(ApiEndpoints.ValidarVersion, {
      params: {
        version: DeviceInfo.getVersion(),
      },
    })
      .then(({data}: AxiosResponse) => {})
      .catch(({response}: AxiosError<any>) => {
        ShowAlert('default', {
          title: 'Error',
          message:
            response === undefined
              ? 'Verifique su conexión a Internet'
              : response!.data.Message === undefined
              ? 'Ocurrio un error en la consulta'
              : response!.data.Message,
        });
        logOut();
      })
      .finally(() => {
        setIsFetching(false);
      });
  }; */

  const signIn = async ({correo, password}: LoginData) => {
    // Function to login
    if (correo.length === 0 || password.length === 0) {
      // If email or password not exist
      ShowAlert('default', {
        title: 'Error',
        message: 'Debe llenar los campos requeridos',
      });
      return;
    }
    const dataUsuario = queryString.stringify({
      // Stringify data
      grant_type: 'password',
      username: correo,
      password: password,
    });
    await postRequestToken<TokenResponse>(dataUsuario)
      .then(({access_token}) => {
        setstatus('authenticated');
        if (access_token) {
          SaveToken(access_token); // Save token in asyncstorage
          settoken(access_token); // Set token in context
        }
      })
      .catch(() => {});
  };

  const logOut = async () => {
    await RemoveAllData();
    setstatus('notauthenticated');
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        token,
        //signUp,
        signIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
