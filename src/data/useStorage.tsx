import AsyncStorage from '@react-native-async-storage/async-storage';

const keyStorage = {
  token: 'token',
  FormulariosGuardados: 'FormulariosGuardados',
};

export const useStorage = () => {
  const SaveToken = async (data: string) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(keyStorage.token, jsonValue);
      return true;
    } catch (error) {
      return false;
    }
  };

  const GetToken = async (): Promise<string> => {
    const value = await AsyncStorage.getItem(keyStorage.token);
    if (value != null) {
      const objToken = JSON.parse(value);
      return objToken;
    }
    return '';
  };

  const CheckToken = async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(keyStorage.token);
      return value != null;
    } catch (error) {
      return false;
    }
  };

  const RemoveAllData = async () => {
    await AsyncStorage.removeItem(keyStorage.token);
  };

  return {SaveToken, GetToken, CheckToken, RemoveAllData};
};
