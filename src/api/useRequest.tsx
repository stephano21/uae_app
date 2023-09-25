import {useContext} from 'react';
import {AlertContext} from '../context/AlertContext';
import {LoaderContext} from '../context/LoaderContext';
import axios, {AxiosError, AxiosResponse} from 'axios';

import {ApiErrorResponse} from '../interfaces/BaseApiInterface';
import {AuthContext} from '../context/AuthContext';
import {ApiEndpoints} from './routes';

export const useRequest = () => {
  const {ShowAlertApiError} = useContext(AlertContext);
  const {setIsLoading} = useContext(LoaderContext);

  //#region AxiosConfig

  const {JWTInfo} = useContext(AuthContext);
  // Create an axios instance for the token endpoint
  const ApiTokenRequest = axios.create({
    baseURL: ApiEndpoints.BaseURL + ApiEndpoints.Token,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  // Create an axios instance for the other endpoints
  const ApiRequest = axios.create({
    baseURL: ApiEndpoints.BaseURL + ApiEndpoints.BaseApi,
    headers: {
      'Content-Type': 'application/json',
      ...(JWTInfo && JWTInfo.length > 0 !== undefined
        ? {Authorization: `Bearer ${JWTInfo}`}
        : {}),
    },
  });
  const ApiPostFileRequest = axios.create({
    baseURL: ApiEndpoints.BaseURL + ApiEndpoints.BaseApi,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JWTInfo}`,
      otherHeader: 'foo',
    },
  });

  //#endregion

  //#region RequestConfig

  const getRequest = async <T extends unknown>(
    endpoint: string,
    params?: object,
    isLoading?: boolean,
  ): Promise<T> => {
    setIsLoading(isLoading === true ? true : false);
    return await ApiRequest.get(endpoint, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object,
  ): Promise<T> => {
    setIsLoading(true);
    return await ApiRequest.post(endpoint, data, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postRequestToken = async <T extends unknown>(
    data: string,
  ): Promise<T> => {
    setIsLoading(true);
    return await ApiTokenRequest.request({
      data,
    })
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        ShowAlertApiError(error);
        console.log(JSON.stringify(error, null, 3));
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postFileRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object,
  ): Promise<T> => {
    setIsLoading(true);
    return await ApiPostFileRequest.post(endpoint, data, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        console.error(JSON.stringify(error, null, 3));
        ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //#endregion

  return {getRequest, postRequestToken, postRequest, postFileRequest};
};
