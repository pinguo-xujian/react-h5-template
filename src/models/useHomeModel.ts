/**
 * useModelHook的写法来处理数据流
 */
import { useState, useCallback } from 'react';
import { getRedirectConfig } from '@/apis';
// 处理首页数据
export default function useHomeModel() {
  const [config, setConfig] = useState<any>({});
  const getHomeConfig = useCallback(async (data:any) => {
    let config = await getRedirectConfig(data);
    setConfig(config);
  }, []);
  return {
    config,
    getHomeConfig,
  };
}
