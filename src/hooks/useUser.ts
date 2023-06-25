/*
 * @Author: pinguo-xujian
 * @Date: 2023-06-24 21:21:43
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-06-24 21:21:54
 * @Description: 
 */

import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>('');
  return {
    name,
    setName,
  };
};

export default useUser;
