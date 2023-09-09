import React, {createContext, useState} from 'react';
import {Modal} from 'react-native';
import {LoadingModal} from './Loader/LoadingModal';

type LoaderContextProps = {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export const LoaderContext = createContext({} as LoaderContextProps);

export const LoaderProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        setIsLoading,
        isLoading,
      }}>
      {children}
      <Modal visible={isLoading} transparent animationType="fade">
        <LoadingModal></LoadingModal>
      </Modal>
    </LoaderContext.Provider>
  );
};
