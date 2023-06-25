/*
 * @Author: Komens
 * @Date: 2021-08-19 14:09:03
 * @LastEditTime: 2023-04-07 10:00:04
 * @LastEditors: pinguo-xujian
 */
export default class Store {
  static instance: Store;

  static storage: typeof localStorage & typeof sessionStorage;

  static getInstance(isSession?: boolean) {
    if (isSession) {
      Store.storage = sessionStorage;
    } else {
      Store.storage = localStorage;
    }
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  /**
   * 添加数据
   * @param key 存储变量名
   * @param data 存储值
   * @param module 所属模块
   */
  public add(key: string, data: any, module?: string) {
    if (module) {
      let m = this.get(module);
      if (!m) {
        m = {};
      }
      m[key] = data;
      let str = this.jsonToString(m);
      Store.storage.setItem(module, str);
      return;
    }
    Store.storage.setItem(key, this.jsonToString(data));
  }

  /**
   * 获取数据
   * @param key 存储变量名
   * @param module 所属模块
   */
  public get(key: string, module?: string) {
    if (module) {
      const m = Store.storage.getItem(module);
      if (m) {
        let data = this.stringToJson(m);
        return data[key];
      }
      return null;
    }
    let m = Store.storage.getItem(key);
    return m ? this.stringToJson(m) : null;
  }

  /**
   * 删除数据
   * @param key
   * @param module
   * @returns
   */
  public remove(key: string, module?: string) {
    if (module) {
      let m = this.get(module);
      if (m) {
        delete m[key];
        this.add(module, m);
      }
      return;
    }
    Store.storage.removeItem(key);
  }

  /**
   * 清空数据
   */
  public clear() {
    Store.storage.clear();
  }

  private stringToJson(str: string = '') {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  private jsonToString(json: any) {
    try {
      return JSON.stringify(json);
    } catch {
      return json;
    }
  }
}
