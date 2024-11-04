import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBaseStorage} from './useBaseStorage';
import { TokenResponse } from '../interfaces/BaseApiInterface';

const keyStorage = {
  UserData: 'UserData',
  FormulariosGuardados: 'FormulariosGuardados',
};

export const useStorage = () => {
  const {SaveData, GetData, CheckData} = useBaseStorage();

  const SaveJWTInfo = async (data: TokenResponse) => {
    console.log(data);
    return await SaveData(data, keyStorage.UserData);
  };

  const GetJWTInfo = async (): Promise<TokenResponse> => {
    return await GetData<TokenResponse>(keyStorage.UserData);
  };

  const CheckJWTInfo = async (): Promise<boolean> => {
    return await CheckData(keyStorage.UserData);
  };

  const RemoveAllData = async () => {
    await AsyncStorage.removeItem(keyStorage.UserData);
    await AsyncStorage.removeItem('OTRealizado');
  };

  return {
    SaveJWTInfo,
    GetJWTInfo,
    CheckJWTInfo,
    RemoveAllData,
  };
};
