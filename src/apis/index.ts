/*
 * @Author: pinguo-xujian
 * @Date: 2023-06-24 15:58:23
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-06-24 21:09:12
 * @Description: 
 */

import Axios from '@/utils/http';
export interface ITokenParams {
  key: string ;
  mimeType:string;
}

const urls = {
  token: '/ugc/v1/upload-token', // 七牛上传图片/视频
};

export const uploadToken = (data: ITokenParams) => {
  return Axios.getInstance().post(urls.token, { data });
};

