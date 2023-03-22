/* eslint-disable consistent-return */
import axios from 'axios';
// import { v4 as uuIdv4 } from 'uuid';
import { toast } from 'react-toastify';

import { toastError } from '@/components/general/ToastNotifications/toastType';
import CONFIG from '@/helpers/config';
import { load, save } from './cookies';

const REQUEST = config => {
  const HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  // for REQUEST
  const user = load(CONFIG.COOKIE_ADMIN_USER);
  const accessToken = user?.token;
  HTTP.interceptors.request.use(request => {
    request.url = {};
    request.headers = {};

    // URL
    request.url = request.baseURL + config.url;

    // Request HEADERs
    if (config.auth) {
      request.headers['x-auth-token'] = accessToken;
    }

    request.method = config.method;
    request.data = config.data;

    return request;
  });

  // for RESPONSE
  HTTP.interceptors.response.use(
    response => {
      if (response.status === 200 || response.status === 201) {
        return response;
      }
    },
    error => {
      if (error.response.status === 401 || error.response.status === 302) {
        save(CONFIG.COOKIE_ADMIN_USER, {});
        window.location.href = '/login';
        return {
          data: { status: false, message: error.response.message, statusCode: 401 },
        };
      }

      if (error.response.status === 429) {
        toast.dismiss();
        toastError({ message: error.response.data.message });
        return (
          error?.response || {
            data: {
              status: false,
              message: error?.response?.data?.message,
              data: [],
              statusCode: 429,
            },
          }
        );
      }

      if (error.response.status === 500) {
        if (
          error.response.data?.message?.includes('jwt malformed') ||
          error.response.data?.message?.includes('invalid token') ||
          error.response.data?.message?.includes('invalid signature')
        ) {
          save(CONFIG.COOKIE_ADMIN_USER, {});
          toast.dismiss();
          window.location.href = '/login';
          return;
        }
      }

      if (
        error.response.status === 400 ||
        error.response.status === 404 ||
        error.response.status === 412 ||
        error.response.status === 500 ||
        error.response.status === 422 ||
        error.response.status === 428 ||
        error.response.status === 403 ||
        error.response.status === 406
      ) {
        return (
          error?.response || {
            data: { status: false, message: 'Something went wrong', data: {} },
          }
        );
      }
    },
  );

  return HTTP();
};

export default REQUEST;