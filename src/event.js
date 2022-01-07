import { on, off, store, mutations } from './store'
export const render = function () {
  const div = document.createElement('div')
  div.className = 'preview-container__mask'
  const header = require('./header').default
  const body = require('./body').default
  const footer = require('./footer').default
  div.innerHTML = `<section class="preview-container">
    ${header()}
    ${body()}
    ${footer()}
  </section>`
  document.body.appendChild(div)
  return div
}

export const showBtn = function () {
  const pre = mutations.findNode('.prev')
  const next = mutations.findNode('.next')
  pre.style.display = store.len > 1 ? 'block' : 'none'
  next.style.display = store.len > 1 ? 'block' : 'none'
  on(pre, 'click', mutations.handlePrev)
  on(next, 'click', mutations.handleNext)
}

export const handleClose = function () {
  const closeNode = mutations.findNode('div.close')
  on(closeNode, 'click', () => {
    try {
      off(window, 'keydown', mutations.handleKeyEvents)
      store.dom.parentNode.removeChild(store.dom)
    } catch (_) {
    }
  })
}

export const renderIcon = function () {
  const fullsceen = mutations.findNode('.action-item.fullsceen')
  const zoomIn = mutations.findNode('.action-item.zoomIn')
  const zoomOut = mutations.findNode('.action-item.zoomOut')
  const rotate = mutations.findNode('.action-item.rotate')
  on(fullsceen, 'click', mutations.handleFullScreen)
  on(rotate, 'click', mutations.handleRotate)
  on(zoomIn, 'click', () => mutations.handlerZoom('in'))
  on(zoomOut, 'click', () => mutations.handlerZoom('out'))
}