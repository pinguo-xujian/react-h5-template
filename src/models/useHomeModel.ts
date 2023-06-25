/*
 * @Author: pinguo-xujian
 * @Date: 2023-06-24 15:58:23
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-06-24 21:09:52
 * @Description: 
 */
/**
 * useModelHook的写法来处理数据流
 */
import { ITokenParams, uploadToken } from '@/apis';
import { useCallback, useState } from 'react';
// 处理首页数据
export default function useQiNiuTokenModel() {
  const [token, setToken] = useState<any>('');

  const getToken = useCallback(async (data: ITokenParams) => {
    let token = await uploadToken(data);
    setToken(token);
  }, []);
  
  return {
    token,
    getToken,
  };
}
