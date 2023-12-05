import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBaseStorage} from './useBaseStorage';

const keyStorage = {
  access_token: 'token',
  FormulariosGuardados: 'FormulariosGuardados',
};

export const useStorage = () => {
  const {SaveData, GetData, CheckData} = useBaseStorage();

  const SaveJWTInfo = async (data: string) => {
    console.log(data);
    return await SaveData(data, keyStorage.access_token);
  };

  const GetJWTInfo = async (): Promise<string> => {
    return await GetData<string>(keyStorage.access_token);
  };

  const CheckJWTInfo = async (): Promise<boolean> => {
    return await CheckData(keyStorage.access_token);
  };

  const RemoveAllData = async () => {
    await AsyncStorage.removeItem(keyStorage.access_token);
    await AsyncStorage.removeItem('OTRealizado');
  };

  return {
    SaveJWTInfo,
    GetJWTInfo,
    CheckJWTInfo,
    RemoveAllData,
  };
};
