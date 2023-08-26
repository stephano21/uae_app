import {useContext} from 'react';
import {AlertContext} from '../context/AlertContext';
import {LoaderContext} from '../context/LoaderContext';
import axios, {AxiosError, AxiosResponse} from 'axios';

import {useApiConfig} from './useApiConfig';
import {ApiErrorResponse} from '../interfaces/BaseApiInterface';

export const useRequest = () => {
  const {ShowAlertApiError} = useContext(AlertContext);
  const {ApiTokenRequest, ApiRequest} = useApiConfig();
  const {setIsFetching} = useContext(LoaderContext);

  const getRequest = async <T extends unknown>(
    endpoint: string,
    params?: object,
  ): Promise<T> => {
    setIsFetching(true);
    return await axios
      .get(endpoint, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const postRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object,
  ): Promise<T> => {
    setIsFetching(true);
    return await ApiRequest.post(endpoint, data, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const postRequestToken = async <T extends unknown>(
    data: string,
  ): Promise<T> => {
    setIsFetching(true);
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
        setIsFetching(false);
      });
  };

  return {getRequest, postRequestToken, postRequest};
};
