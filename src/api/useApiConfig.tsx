import axios from 'axios';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {ApiEndpoints} from './routes';

export const useApiConfig = () => {
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
      ...(JWTInfo && JWTInfo.access_token !== undefined
        ? {Authorization: `Bearer ${JWTInfo.access_token}`}
        : {}),
    },
  });
  const ApiPostFileRequest = axios.create({
    baseURL: ApiEndpoints.BaseURL + ApiEndpoints.BaseApi,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer  ${
        JWTInfo !== undefined ? JWTInfo.access_token : ''
      }`,
      otherHeader: 'foo',
    },
  });

  return {ApiRequest, ApiTokenRequest, ApiPostFileRequest};
};
