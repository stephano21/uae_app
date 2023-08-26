import axios from 'axios';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {ApiEndpoints} from './routes';

export const useApiConfig = () => {
  const {token} = useContext(AuthContext);
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
    baseURL: ApiEndpoints.BaseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const ApiPostFileRequest = axios.create({
    baseURL: ApiEndpoints.BaseURL + ApiEndpoints.BaseApi,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      otherHeader: 'foo',
    },
  });
  return {ApiRequest, ApiTokenRequest, ApiPostFileRequest};
};
