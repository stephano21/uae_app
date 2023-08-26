import {TokenResponse} from '../interfaces/BaseApiInterface';
import {useBaseStorage} from './useBaseStorage';

const keyStorage = {
  token: 'token',
};

export const useStorage = () => {
  const {SaveData, GetData, CheckData, DeleteData, RemoveData} =
    useBaseStorage();

  //#region Token
  const SaveJWTInfo = async (data: TokenResponse) => {
    return await SaveData(data, keyStorage.token);
  };

  const GetJWTInfo = async (): Promise<TokenResponse> => {
    return await GetData<TokenResponse>(keyStorage.token);
  };

  const CheckJWTInfo = async (): Promise<boolean> => {
    return await CheckData(keyStorage.token);
  };
  //#endregion

  const RemoveAllData = async () => {
    await RemoveData([keyStorage.token]);
  };

  return {SaveJWTInfo, GetJWTInfo, CheckJWTInfo, RemoveAllData};
};
