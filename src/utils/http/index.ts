/*
 * @Author: komens
 * @Date: 2023-03-01 10:22:44
 * @LastEditTime: 2023-03-25 10:11:39
 * @LastEditors: komens
 */

import CONFIG from '@/config';
import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { adapterRequestInterceptor, adapterResponseInterceptor } from './interceptor/adapter';
import { requestInterceptor, requestInterceptorError, responseInterceptor, responseInterceptorError } from './interceptor/default';

enum ECode {
  SUCCESS = 0,
}

export interface IApiData {
  data: any;
  status: ECode;
  message: string;
}
interface IData extends AxiosResponse {
  data: IApiData;
}

// 默认携带cookie
axios.defaults.withCredentials = true;

class Http {
  private static instance: Http;
  public session: AxiosInstance;

  constructor() {
    let baseURL = CONFIG.api;
    const options = {
      baseURL,
      timeout: 12000,
    };
    this.session = axios.create(options);
    this.session.interceptors.request.use(adapterRequestInterceptor, requestInterceptorError);
    this.session.interceptors.request.use(requestInterceptor, requestInterceptorError);
    this.session.interceptors.response.use(responseInterceptor, responseInterceptorError);
    this.session.interceptors.response.use(adapterResponseInterceptor);
  }
  static getInstance() {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  }
  public checkResponse(response: IData) {
    return new Promise((resolve, reject) => {
      const { data } = response;
      // const { status, message: msg } = data;
      // if (status !== ECode.SUCCESS) {
      //   message.warning(msg);
      //   return reject({ status, msg, data: data?.data });
      // }
      return resolve(data);
    });
  }
  /**
   * get方法
   * @param url api接口
   */

  get(api: string, params?: AxiosRequestConfig) {
    return this.session(Object.assign({ method: 'get', url: api }, params)).then((response: IData) => {
      return this.checkResponse(response);
    });
  }

  /**
   * post方法
   * @param url api接口
   * @param param 参数
   */
  post(api: string, params?: AxiosRequestConfig) {
    return this.session(Object.assign({ method: 'post', url: api }, params)).then((response: IData) => {
      return this.checkResponse(response);
    });
  }

  //! 由于客户端签名只做了GET和POST，其他请求不能签名所以此处禁用掉

  /**
   * delete方法
   * @param url  api接口
   */
  // delete(api: string, params?: AxiosRequestConfig) {
  //   return this.session(Object.assign({ method: 'delete', url: api }, params)).then((response: IData) => {
  //     return this.checkResponse(response);
  //   });
  // }

  /**
   * put方法
   * @param url  api接口
   * @param param 参数
   */
  // put(api: string, params?: AxiosRequestConfig) {
  //   return this.session(Object.assign({ method: 'put', url: api }, params)).then((response: IData) => {
  //     return this.checkResponse(response);
  //   });
  // }

  /**
   * patch方法
   * @param url api接口
   * @param param 参数
   */
  // patch(api: string, params?: AxiosRequestConfig) {
  //   return this.session(Object.assign({ method: 'patch', url: api }, params)).then((response: IData) => {
  //     return this.checkResponse(response);
  //   });
  // }
}

export default Http;
