/*
 * @Author: pinguo-xujian
 * @Date: 2023-03-03 09:41:54
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-04-18 19:41:37
 * @Description:
 */
import dayjs from 'dayjs';
/**
 * 格式化时间展示
 * @param date 时间字符串
 * @param parse 解析格式
 * @returns
 */
export function formatDate(date: string, parse: string = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return date;
  return dayjs(date).format(parse);
}
