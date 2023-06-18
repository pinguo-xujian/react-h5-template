/*
 * @Author: xujian
 * @Date: 2023-06-09 22:45:13
 * @LastEditors: xujian
 * @LastEditTime: 2023-06-09 23:49:38
 * @Description: 
 * @FilePath: /react-h5-template/src/apis/index.ts
 */
interface IParams {
  code: string | number;
}

interface IScanPrams {
  code: number | string;
  scanTime: string;
}
export const getRedirectConfig=(data:IParams)=>{
  return Promise.resolve()
}