import { createContext } from 'react';
export interface IFontContextProps {
  bold: string;
  regular: string;
}
const fontContextDefaultValue = {
  bold: 'PingFang SC-Medium',
  regular: 'PingFang SC-Regular',
};
export const FontContext = createContext<IFontContextProps>(fontContextDefaultValue);
