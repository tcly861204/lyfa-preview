/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/23 下午3:22:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/23 上午9:18:26
  @Github: https://tcly861204.github.io
*/
import { store } from '@/store'
export const findNode = (cls: string): HTMLDivElement => {
  return store.dom.querySelector(cls)
}

export const on = (function () {
  return function (element: Element | Window, event: string, handler: EventListenerOrEventListenerObject | null) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false)
    }
  }
})()

export const off = (function () {
  return function (element: Element | Window, event: string, handler: EventListenerOrEventListenerObject | null) {
    if (element && event) {
      element.removeEventListener(event, handler, false)
    }
  }
})()