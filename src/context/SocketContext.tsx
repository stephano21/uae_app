import React, {createContext, useEffect, useState} from 'react';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {ApiEndpoints} from '../api/routes';
import {SocketMethods} from '../data/Socket.';
import Toast from 'react-native-toast-message';

interface Props {
  children: JSX.Element | JSX.Element[];
}

type SocketContextProps = {
  createSignalRConnection: (token: string) => HubConnection;
  startConnection: (token: string, username: string) => void;
  closeConnection: () => void;
};

export const SocketContext = createContext({} as SocketContextProps);

export const SocketProvider = ({children}: Props) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const createSignalRConnection = (token: string): HubConnection => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(ApiEndpoints.BaseURL + ApiEndpoints.chatHub, {
        accessTokenFactory: () => token,
      })
      .build();
    return newConnection;
  };

  const ShowMessage = (usuario: string, message: string) => {
    Toast.show({
      type: 'info',
      text1: usuario,
      text2: message,
      autoHide: true,
    });
  };

  const startConnection = (token: string, username: string) => {
    const newConnection = createSignalRConnection(token);
    newConnection
      .start()
      .then(() => {
        console.log('Conexión a SignalR establecida');
        newConnection
          .invoke(SocketMethods.AgregarUsuarioAlGrupo, username, 'GrupoHumo')
          .catch(error => {
            console.error('Error al agregar usuario al grupo:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error al conectar a SignalR:', error);
      });
    newConnection.on(
      SocketMethods.RecibirMensaje,
      (usuario: string, contenido: string) => {
        ShowMessage(usuario, contenido);
      },
    );

    setConnection(newConnection);
  };

  const closeConnection = () => {
    if (connection) {
      connection.stop();
      setConnection(null);
    }
  };

  useEffect(() => {
    console.log('Estado Conexion a SignalR: ', connection);
  }, [connection]);

  return (
    <SocketContext.Provider
      value={{
        createSignalRConnection,
        startConnection,
        closeConnection,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
