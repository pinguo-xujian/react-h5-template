/*
 * @Author: komens
 * @Date: 2023-03-01 10:28:15
 * @LastEditTime: 2023-05-09 15:02:25
 * @LastEditors: pinguo-xujian
 */
import { EBridgeType } from '@/constants/bridge';
import { bridgeCall } from '@/utils/bridge';
import { Toast } from 'antd-mobile';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { getIntl } from 'umi';

export const requestInterceptorError = (err: AxiosError) => err;
export const requestInterceptor = (config: AxiosRequestConfig) => {
  return config;
};

export const responseInterceptor = (response: AxiosResponse) => response;
export const responseInterceptorError = (err: AxiosError<any>) => {
  if (err.message.includes('timeout')) {
    Toast.show(getIntl().formatMessage({ id: 'base.network.timeout', defaultMessage: '网络超时' }));
    return Promise.reject({ err, isHandle: true });
  }
  if (err.message.includes('Network Error')) {
    Toast.show(getIntl().formatMessage({ id: 'base.network.error', defaultMessage: '网络错误' }));
    return Promise.reject({ err, isHandle: true });
  }
  console.log('err.response', err.response);

  if (err.response) {
    switch (err.response.status) {
      case 400: {
        if (err.response['data']['code'] === 400) {
          Toast.show(getIntl().formatMessage({ id: 'home.list.empty', defaultMessage: '未找到内容' }));
          return Promise.reject({ err, isHandle: true });
        } else {
          return Promise.reject({ err, isHandle: false });
        }
      }
      case 450: {
        if (err.response['data']['code'] === 11051) {
          Toast.show(getIntl().formatMessage({ id: 'contentInfoModal.no.project', defaultMessage: '工程不存在' }));
          return Promise.reject({ err, isHandle: true });
        } else if (err.response['data']['code'] === 11022) {
          Toast.show(getIntl().formatMessage({ id: 'contentInfoModal.no.preset', defaultMessage: '预设不存在' }));
          return Promise.reject({ err, isHandle: true });
        } else if (err.response['data']['code'] === 11062) {
          return Promise.reject({ err, isHandle: false, code: 11062, message: err.response['data']['message'] });
        } else if (err.response['data']['code'] === 11070) {
          Toast.show(getIntl().formatMessage({ id: 'submission.repeat.upload', defaultMessage: '重复上传' }));
          return Promise.reject({ err, isHandle: true });
        } else {
          Toast.show(err.response['data']['message'] || 'Unknown Error');
          return Promise.reject({ err, isHandle: true });
        }
      }
      default:
        Toast.show(err.response['data']['message'] || 'Unknown Error');
        return Promise.reject({ err, isHandle: true });
    }
  }
  return Promise.reject({ err, isHandle: false });
};
