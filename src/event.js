/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/7 下午4:20:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/7 下午4:20:49
  @Github: https://tcly861204.github.io
*/
import { store, Mutations } from './store'
import { on, off } from './utils'
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
  const pre = Mutations.findNode('.prev')
  const next = Mutations.findNode('.next')
  pre.style.display = store.len > 1 ? 'block' : 'none'
  next.style.display = store.len > 1 ? 'block' : 'none'
  on(pre, 'click', Mutations.handlePrev)
  on(next, 'click', Mutations.handleNext)
}

export const handleClose = function () {
  const closeNode = Mutations.findNode('div.close')
  on(closeNode, 'click', () => {
    try {
      off(window, 'keydown', Mutations.handleKeyEvents)
      store.dom.parentNode.removeChild(store.dom)
    } catch (_) {
    }
  })
}

export const handleIcon = function () {
  const fullsceen = Mutations.findNode('.action-item.fullsceen')
  const zoomIn = Mutations.findNode('.action-item.zoomIn')
  const zoomOut = Mutations.findNode('.action-item.zoomOut')
  const rotate = Mutations.findNode('.action-item.rotate')
  on(fullsceen, 'click', Mutations.handleFullScreen)
  on(rotate, 'click', Mutations.handleRotate)
  on(zoomIn, 'click', () => Mutations.handlerZoom('in'))
  on(zoomOut, 'click', () => Mutations.handlerZoom('out'))
}