import { findNode, on } from '@/libs/utils'
import { store, Item, Mutations } from '@/store'
import Loading from '@/template/loading'
export default class Core {
  protected winWidth: number
  protected winHeight: number
  protected isLayout: boolean
  constructor () {
    this.winWidth = window.innerWidth
    this.winHeight = window.innerHeight
    this.isLayout = false
  }

  protected updateNum () {
    const appNode = findNode('.action-item.app')
    appNode.setAttribute('data-num', `${store.index + 1}/${store.len}`)
  }

  protected updateTitle (item: Item) {
    const titleNode = findNode('h2.title')
    titleNode.innerHTML = item.name
  }

  protected render (item: Item) {
    const swipper = findNode('.swipper')
    swipper.innerHTML = Loading()
    const img: HTMLImageElement = new Image()
    const self = this
    img.src = item.src
    img.onload = function () {
      const imgWidth = img.width
      const imgHeight = img.height
      store.imgWidth = imgWidth
      store.imgHeight = imgHeight
      if (imgWidth > (self.winWidth - 140) || imgHeight > (self.winHeight - 140)) {
        const hBit = (self.winHeight - 140) / imgHeight
        const wBit = (self.winWidth - 140) / imgWidth
        store.scaleNum = wBit > hBit ? hBit : wBit
        store.fullScreen = false
        store.imgLeft = (self.winWidth - imgWidth * store.scaleNum) / 2
        store.imgTop = (self.winHeight - imgHeight * store.scaleNum) / 2
      } else {
        store.fullScreen = false
        store.imgLeft = (self.winWidth - imgWidth) / 2
        store.imgTop = (self.winHeight - imgHeight) / 2
      }
      self.renderImage(item, imgWidth, imgHeight)
    }
  }

  private renderImage (item: Item, imgWidth: number, imgHeight: number) {
    const img = document.createElement('img')
    let _step = null
    img.src= item.src
    img.setAttribute('style', `
      position: absolute;
      width: ${imgWidth * store.scaleNum}px;
      height: ${imgHeight * store.scaleNum}px;
      top: ${store.imgTop}px;
      left: ${store.imgLeft}px;
      cursor: pointer;
      transition: all ease-in-out .4s;
    `)

    img.addEventListener('mousedown', function (e) {
      e.preventDefault()
      this.style.cursor = 'move'
      this.style.transition = 'none'
      const dis = {
        x: e.clientX,
        y: e.clientY,
        gx: store.imgLeft,
        gy: store.imgTop
      }
      document.onmousemove = ev => {
        store.imgLeft = dis.gx + (ev.clientX - dis.x)
        store.imgTop = dis.gy + (ev.clientY - dis.y)
        this.style.left = `${store.imgLeft}px`
        this.style.top = `${store.imgTop}px`
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        this.style.cursor = 'pointer'
        this.style.transition = 'all ease-in-out .4s'
      }
    }, false)

    on(img, 'mousewheel', function (e: WheelEvent) {
      e.preventDefault()
      const [tempScaleNum, scaleX, scaleY] = [store.scaleNum, e.clientX - store.imgLeft, e.clientY - store.imgTop]
      this.style.transition = 'none'
      if (e.deltaY < 0) {
        _step = 0.08
        if (tempScaleNum > 10) {
          _step = 0
        }
      } else {
        _step = -0.08
        if (tempScaleNum < 0.2) {
          _step = 0
        }
      }
      store.scaleNum += _step
      store.imgTop -= (store.scaleNum / tempScaleNum - 1) * scaleY
      store.imgLeft -= (store.scaleNum / tempScaleNum - 1) * scaleX
      this.style.left = `${store.imgLeft}px`
      this.style.top = `${store.imgTop}px`
      this.style.width = `${imgWidth * store.scaleNum}px`
      this.style.height = `${imgHeight * store.scaleNum}px`
    })

    on(img, 'mouseout', function (e) {
      if (this.style.transition.indexOf('none') > -1) {
        this.style.transition = 'all ease-in-out .4s'
      }
    })

    const timer = setTimeout(() => {
      clearTimeout(timer)
      const swipper = findNode('.swipper')
      swipper.innerHTML = ''
      swipper.appendChild(img)
      Mutations.updateScreen()
    }, 100)
  }
}