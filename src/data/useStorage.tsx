import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokenResponse} from '../interfaces/BaseApiInterface';
import {useBaseStorage} from './useBaseStorage';
import DeviceInfo from 'react-native-device-info';

const keyStorage = {
  access_token: 'access_token',
  refresh_token: 'token',
  FormulariosGuardados: 'FormulariosGuardados',
};

export const useStorage = () => {
  const {SaveData, GetData, CheckData, DeleteData, RemoveData} =
    useBaseStorage();

  const SaveJWTInfo = async (data: TokenResponse) => {
    return await SaveData(data, keyStorage.access_token);
  };

  const GetJWTInfo = async (): Promise<TokenResponse> => {
    return await GetData<TokenResponse>(keyStorage.access_token);
  };

  const CheckJWTInfo = async (): Promise<boolean> => {
    return await CheckData(keyStorage.access_token);
  };

  const RemoveAllData = async () => {
    await AsyncStorage.removeItem(keyStorage.access_token);
    await AsyncStorage.removeItem(keyStorage.refresh_token);
    await AsyncStorage.removeItem(keyStorage.refresh_token);
    await AsyncStorage.removeItem('OTRealizado');
  };

  return {
    SaveJWTInfo,
    GetJWTInfo,
    CheckJWTInfo,
    RemoveAllData,
  };
};
