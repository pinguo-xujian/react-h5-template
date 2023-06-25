/*
 * @Author: komens
 * @Date: 2023-03-14 10:40:41
 * @LastEditTime: 2023-03-22 14:27:09
 * @LastEditors: komens
 */

type EventMap = Record<string, Function[]>;
export default class EventEmitter {
  private static instance: EventEmitter | null = null;
  private eventMap: EventMap = {};

  public constructor() {
    if (EventEmitter.instance === null) {
      EventEmitter.instance = this;
    }
    return EventEmitter.instance;
  }

  public on(eventName: string, callback: Function): void {
    this.eventMap[eventName] ??= [];
    this.eventMap[eventName].push(callback);
  }

  public emit(eventName: string, ...args: any[]): void {
    const handlers = [...(this.eventMap[eventName] ?? [])];
    handlers.forEach((handler) => handler(...args));
  }

  public remove(eventName: string, callback?: Function): void {
    const callbacks = this.eventMap[eventName] ?? [];
    if (callback === undefined) {
      this.eventMap[eventName] = [];
    } else {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  public once(eventName: string, callback: Function): void {
    const wrapper = (...args: any) => {
      callback(...args);
      this.remove(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

const bus = new EventEmitter();

export type TEventEmitter = typeof bus;
