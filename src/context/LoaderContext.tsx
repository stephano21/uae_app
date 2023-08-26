import React, {createContext, useState} from 'react';
import {Modal} from 'react-native';
import {LoadingModal} from './Loader/LoadingModal';

type LoaderContextProps = {
  setIsFetching: (isloading: boolean) => void;
  isFetching: boolean;
};

export const LoaderContext = createContext({} as LoaderContextProps);

export const LoaderProvider = ({children}: any) => {
  const [isFetching, setIsFetching] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        setIsFetching,
        isFetching,
      }}>
      {children}
      <Modal visible={isFetching} transparent animationType="fade">
        <LoadingModal></LoadingModal>
      </Modal>
    </LoaderContext.Provider>
  );
};
