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