import { store, Mutations } from '@/store'
import { findNode, on, off } from '@/libs/utils'
export const bindCloseEvent = function () {
  const closeNode = findNode('div.close')
  on(closeNode, 'click', () => {
    try {
      off(window, 'keydown', Mutations.handleKeyEvents)
      store.dom.parentNode.removeChild(store.dom)
    } catch (_) {
    }
  })
}

export const bindIconEvent = function () {
  const fullsceen = findNode('.action-item.fullsceen')
  const zoomIn = findNode('.action-item.zoomIn')
  const zoomOut = findNode('.action-item.zoomOut')
  const rotate = findNode('.action-item.rotate')
  on(fullsceen, 'click', Mutations.handleFullScreen)
  on(rotate, 'click', Mutations.handleRotate)
  on(zoomIn, 'click', () => Mutations.handlerZoom('in'))
  on(zoomOut, 'click', () => Mutations.handlerZoom('out'))
}
