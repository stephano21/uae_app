import React, {createContext, useContext, useEffect, useState} from 'react';
import queryString from 'query-string';
import {CreateUser, LoginData} from '../interfaces/UserInterface';
import {AlertContext} from './AlertContext';
import {sleep} from '../helpers/sleep';
import {useStorage} from '../data/useStorage';
import {useRequest} from '../api/useRequest';
import {TokenResponse} from '../interfaces/BaseApiInterface';
import {ApiEndpoints} from '../api/routes';
import {SocketContext} from './SocketContext';

type AuthContextProps = {
  status: StatusTypes;
  //signUp: (obj: CreateUser, pass: string) => Promise<void>;
  signUp: (obj: CreateUser) => Promise<void>;
  signIn: (obj: LoginData) => Promise<void>;
  logOut: () => void;
  JWTInfo: TokenResponse;
};

type StatusTypes = 'checking' | 'authenticated' | 'notauthenticated';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const {ShowAlert} = useContext(AlertContext);
  const {SaveJWTInfo, GetJWTInfo, CheckJWTInfo, RemoveAllData} = useStorage();
  const {postRequest} = useRequest();
  const [status, setstatus] = useState<StatusTypes>('checking');
  const [JWTInfo, setJWTInfo] = useState<TokenResponse>({} as TokenResponse);
  const {startConnection, closeConnection} = useContext(SocketContext);

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
    await CheckJWTInfo().then(check =>
      check
        ? GetJWTInfo().then(jwtInfo => {
            setJWTInfo(jwtInfo);
            setstatus('authenticated');
            //startConnection(jwtInfo.token, jwtInfo.userName);
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

  /*   const signIn = async ({correo, password}: LoginData) => {
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
 */

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

    await postRequest<TokenResponse>(ApiEndpoints.login, {
      username: correo,
      password,
    })
      .then(jwtInfo => {
        setstatus('authenticated');
        SaveJWTInfo(jwtInfo);
        //startConnection(jwtInfo.token, jwtInfo.userName);
      })
      .catch(console.log);
  };
  const signUp = async ({correo, password}: LoginData) => {
    // Function to login
    if (correo.length === 0 || password.length === 0) {
      // If email or password not exist
      ShowAlert('default', {
        title: 'Error',
        message: 'Debe llenar los campos requeridos',
      });
      return;
    }

    await postRequest(ApiEndpoints.register, {
      username: correo,
      password,
    })
      .then((mss: any) => {
        ShowAlert('default', {message: mss ? mss : '', title: 'Exito'});
        //startConnection(jwtInfo.token, jwtInfo.userName);
      })
      .catch(console.log);
  };

  const logOut = async () => {
    await RemoveAllData();
    //closeConnection();
    setstatus('notauthenticated');
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        JWTInfo,
        signUp,
        signIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
