/*
 * @Author: pinguo-xujian
 * @Date: 2023-02-26 21:36:41
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-06-24 21:29:23
 * @Description:首页
 */
import { ConfigProvider } from 'antd-mobile';
import {  Outlet   } from 'umi';
import enUS from 'antd-mobile/es/locales/en-US';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import {   useMemo } from 'react';
import { FontContext } from '@/context';

export default function Layout() {
  const language = navigator.language;
  const locale = useMemo(() => {
    switch (language.toLocaleLowerCase()) {
      case 'zh-cn': {
        return zhCN;
      }
      default: {
        return enUS;
      }
    }
  }, [language]);
  const fontStyle = useMemo(() => {
    switch (language.toLocaleLowerCase()) {
      case 'en-us': {
        // 英文
        return { bold: 'MontserratSemiBold', regular: 'MontserratRegular' };
      }
      default: {
        return { bold: 'MontserratSemiBold', regular: 'MontserratRegular' };
        // 中文
      }
    }
  }, [language]);
  const globalFont = useMemo(() => {
    switch (language.toLocaleLowerCase()) {
      case 'en-us': {
        // 英文
        return { fontFamily: 'MontserratSemiBold', '--adm-font-family': 'MontserratSemiBold' };
      }
      default: {
        // 中文
        return { fontFamily: 'MontserratSemiBold', '--adm-font-family': 'MontserratSemiBold' };
      }
    }
  }, [language]);

 
  return (
    <ConfigProvider locale={locale}>
      <FontContext.Provider value={fontStyle}>
        <div style={globalFont}>
          <Outlet />
        </div>
      </FontContext.Provider>
    </ConfigProvider>
  );
}
