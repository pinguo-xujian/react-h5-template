/*
 * @Author: komens
 * @Date: 2023-03-01 11:02:39
 * @LastEditTime: 2023-03-24 18:00:14
 * @LastEditors: komens
 */
import { EBridgeType } from '@/constants/bridge';
import { bridgeCall } from '@/utils/bridge';
import { JSONStringify, objKeySort } from '@/utils/tool';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import httpAdapter from '../config';
import _ from 'lodash';
import qs from 'qs';

interface INewAxiosRequestConfig extends AxiosRequestConfig {
  _url?: string; // 替换变量前的url地址
}
interface INewAxiosResponse extends AxiosResponse {
  config: INewAxiosRequestConfig;
}

export const adapterRequestInterceptor = async (config: INewAxiosRequestConfig) => {
  const { url = '', params = {}, method, data } = config;

  let newData2 = data;
  try {
    if (!(data instanceof FormData) && _.isObject(data)) {
      newData2 = objKeySort(data);

      config.data = newData2;
    }
  } catch (error) {}
  // 更新存在变量模板的url地址
  const [newUrl, newParams] = replaceUrlAndUpdateParams(url, params);
  config.url = newUrl;
  config._url = url;
  config.params = newParams;

  // 寻找适配器处理
  const adapter = httpAdapter[`${method} ${url}`];
  if (adapter && adapter.request) {
    config = adapter.request(config) || config;
  }

  // 处理签名query
  let queryStr = '';
  Object.keys(config.params).forEach((key) => {
    queryStr += '&' + key + '=' + config.params[key];
  });

  const signData = (await bridgeCall({
    type: EBridgeType.SIGN,
    data: {
      path: config.url,
      method: config.method?.toUpperCase(),
      query: queryStr.slice(1),
      data: newData2,
    },
  })) as string;

  // 为请求添加公共参数
  const commonParams =
    ((await bridgeCall({
      type: EBridgeType.GET_COMMON_PARAMS,
    })) as TObjectKey) || {};
  Object.keys(commonParams).forEach((key) => {
    const val = commonParams[key];
    config.headers![key] = val;
  });
  // TODO: 临时使用万能签 56610f9fce1cdd07098cd81d
  config.headers!['PG-Sign'] = signData;
  // config.headers!['PG-Sign'] = '56610f9fce1cdd07098cd81d';
  return config;
};

export const adapterResponseInterceptor = (response: INewAxiosResponse) => {
  if (!response?.config) {
    return response;
  }
  const { config } = response;
  const { _url, method } = config;
  const adapter = httpAdapter[`${method} ${_url}`];
  /**
   * 如果有适配器则进行适配
   * 如果是函数则返回执行结果
   * 其他情况直接返回response
   */
  if (adapter && adapter.response) {
    const newData = typeof adapter.response === 'function' ? adapter.response(response.data) : adapter.response;
    response.data = newData;
  }
  return response;
};

/**
 * 将地址中为:xxx的替换为正确得值(值从params里面取)
 *
 * @param url
 * @param params
 * @returns
 */
export function replaceUrlAndUpdateParams(url: string, params: TObjectKey): [string, TObjectKey] {
  // 以下情况不处理直接返回
  if (!url.includes(':') || !params || Object.keys(params).length === 0) {
    return [url, params];
  }

  const keys = Object.keys(params);
  let newUrl = url;
  let newParams: TObjectKey = {};
  keys.forEach((key) => {
    if (newUrl.includes(':' + key)) {
      newUrl = newUrl.replace(':' + key, params[key]);
    } else {
      newParams[key] = params[key];
    }
  });

  return [newUrl, newParams];
}
