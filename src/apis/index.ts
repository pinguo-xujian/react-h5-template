interface IParams {
  code: string | number;
}

interface IScanPrams {
  code: number | string;
  scanTime: string;
}
export const getRedirectConfig = (data: IParams) => {
  return Promise.resolve();
};
