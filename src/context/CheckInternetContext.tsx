import React, {createContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

type CheckInternetContextProps = {
  hasConection: boolean;
};

export const CheckInternetContext = createContext(
  {} as CheckInternetContextProps,
);

export const CheckInternetProvider = ({children}: any) => {
  const [hasConection, sethasConection] = useState<boolean>(true);

  const InternetError = () => {
    sethasConection(false);
    Toast.show({
      type: 'error',
      text1: 'Aviso',
      text2: 'Sin conexión a internet',
      autoHide: false,
    });
  };
  const InternetOk = () => {
    sethasConection(true);
    Toast.show({
      type: 'success',
      text1: 'Aviso',
      text2: 'La conexión a internet se ha restablecido',
    });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state =>
      !state.isConnected ? InternetError() : InternetOk(),
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <CheckInternetContext.Provider value={{hasConection}}>
      {children}
    </CheckInternetContext.Provider>
  );
};
