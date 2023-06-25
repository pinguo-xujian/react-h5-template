/*
 * @Author: pinguo-xujian
 * @Date: 2023-06-24 21:41:30
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-06-24 21:41:37
 * @Description: 
 */

declare namespace TAxios {
  export type Dispatch = any;

  export type TAdapters = {
    [key: string]: TAdapter;
  };

  export type TAdapter = {
    request: Function;
    response: Function;
  };
}
