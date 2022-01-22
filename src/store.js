/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/7 下午4:20:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/7 下午4:20:49
  @Github: https://tcly861204.github.io
*/
// @ts-nocheck
export const store = {
  index: 0,
  len: 0,
  list: [],
  dom: null,
  app: null,
  imgWidth: null,
  imgHeight: null,
  rotateNum: 0,
  scaleNum: 1,
  imgLeft: 0,
  imgTop: 0,
  fullScreen: true,
  btns: {
    prev: null,
    next: null
  }
}

export class Mutations {
  static findNode (cls) {
    return store.dom.querySelector(cls)
  }

  static handlePrev () {
    store.app.display(store.index === 0 ? store.len - 1 : store.index - 1)
  }

  static handleNext () {
    store.app.display(store.index === store.len - 1 ? 0 : store.index + 1)
    
  }

  static handleKeyEvents (e) {
    try {
      switch (e.code.toLocaleLowerCase()) {
        case 'escape':
          window.removeEventListener('keydown', Mutations.handleKeyEvents, false)
          store.dom.parentNode.removeChild(store.dom)
          break
        case 'keya':
        case 'arrowleft':
          Mutations.handlePrev()
          break
        case 'keyd':
        case 'arrowright':
          Mutations.handlePrev()
          break
      }
    } catch (_) {
    }
  }

  static updateScreen () {
    const img = Mutations.findNode('.swipper img')
    const fullsceen = Mutations.findNode('.action-item.fullsceen .icon')
    store.fullScreen = (parseInt(img.style.width) >= window.innerWidth) || (parseInt(img.style.height) >= window.innerHeight)
    fullsceen.style.backgroundPosition = `${store.fullScreen ? '-28px -27px' : '-28px 0'}`
  }

  static updateNum () {
    const app = Mutations.findNode('.action-item.app')
    app.setAttribute('data-num', `${store.index + 1}/${store.len}`)
  }

  static handleFullScreen () {
    const fullsceen = Mutations.findNode('.action-item.fullsceen .icon')
    const img = Mutations.findNode('.swipper img')
    let hBit = 1
    let wBit = 1
    if (store.fullScreen) {
      store.fullScreen = false
      hBit = (window.innerHeight - 140) / store.imgHeight
      wBit = (window.innerWidth - 140) / store.imgWidth
      store.scaleNum = wBit > hBit ? hBit : wBit
    } else {
      store.fullScreen = true
      hBit = window.innerHeight / store.imgHeight
      wBit = window.innerWidth / store.imgWidth
      store.scaleNum = wBit > hBit ? wBit : hBit
    }
    const scaleWidth = store.imgWidth * store.scaleNum
    const scaleHeight = store.imgHeight * store.scaleNum
    store.imgLeft = (window.innerWidth - scaleWidth) / 2
    store.imgTop = (window.innerHeight - scaleHeight) / 2
    img.style.width = `${scaleWidth}px`
    img.style.height = `${scaleHeight}px`
    img.style.top = `${store.imgTop}px`
    img.style.left = `${store.imgLeft}px`
    fullsceen.style.backgroundPosition = `${store.fullScreen ? '-28px -27px' : '-28px 0'}`
  }

  static handlerZoom (type) {
    const img = Mutations.findNode('.swipper img')
    if (type === 'in') {
      if (store.scaleNum + 0.2 < 3) {
        store.scaleNum += 0.2
      } else {
        return false
      }
    }
    if (type === 'out') {
      if (store.scaleNum - 0.2 > 0.2) {
        store.scaleNum -= 0.2
      } else {
        return false
      }
    }
    const scaleWidth = store.imgWidth*store.scaleNum
    const scaleHeight = store.imgHeight*store.scaleNum
    store.imgLeft = store.imgLeft + (parseInt(img.style.width) - scaleWidth)/2
    store.imgTop = store.imgTop + (parseInt(img.style.height) - scaleHeight)/2
    img.style.width = `${scaleWidth}px`
    img.style.height = `${scaleHeight}px`
    img.style.top = `${store.imgTop}px`
    img.style.left = `${store.imgLeft}px`
    Mutations.updateScreen()
  }

  static handleRotate () {
    const img = Mutations.findNode('.swipper img')
    store.rotateNum -= 90
    img.style.transform = `rotate(${store.rotateNum}deg)`
  }

  static handleApp () {
    const footNode = Mutations.findNode('.preview-container__footer')
    const transform = getComputedStyle(footNode, null).getPropertyValue('transform')
    footNode.style.transform = transform === 'matrix(1, 0, 0, 1, 0, 80)' ? 'matrix(1, 0, 0, 1, 0, 0)' : 'matrix(1, 0, 0, 1, 0, 80)'
  }
}