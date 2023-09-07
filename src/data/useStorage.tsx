import {TokenResponse} from '../interfaces/BaseApiInterface';
import {useBaseStorage} from './useBaseStorage';

const keyStorage = {
  access_token: 'token',
  refresh_token: 'token',
};

export const useStorage = () => {
  const {SaveData, GetData, CheckData, DeleteData, RemoveData} =
    useBaseStorage();

  //#region Token
  const SaveJWTInfo = async (data: TokenResponse) => {
    return await SaveData(data, keyStorage.access_token);
  };

  const GetJWTInfo = async (): Promise<TokenResponse> => {
    return await GetData<TokenResponse>(keyStorage.access_token);
  };

  const CheckJWTInfo = async (): Promise<boolean> => {
    return await CheckData(keyStorage.access_token);
  };
  //#endregion

  const RemoveAllData = async () => {
    await RemoveData([keyStorage.access_token]);
  };

  return {SaveJWTInfo, GetJWTInfo, CheckJWTInfo, RemoveAllData};
};
