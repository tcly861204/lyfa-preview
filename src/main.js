import { render, renderIcon, handleClose, showBtn, renderSmall } from './event'
import { on, store, mutations } from './store'
import './style.scss'
export default class Preview {
  constructor (options) {
    store.list = options.list
    store.len = store.list.length
    store.dom = render()
    store.index = 0
    store.app = this
    showBtn()
    on(window, 'keydown', mutations.handleKeyEvents)
    handleClose()
    renderIcon()
    return this
  }
  display (index = 0) {
    const div = store.dom
    store.rotateNum = 0
    store.index = index > store.len - 1 ? 0 : index
    mutations.updateNum()
    try {
      const item = store.list[store.index]
      div.querySelector('h2.title').innerHTML=item.name
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight
      store.scaleNum = 1
      store.imgLeft = 0
      store.imgTop = 0
      store.fullScreen = true
      let _step = null
      if (item.src) {
        switch (item.ext.toLocaleLowerCase()) {
          case 'jpeg':
          case 'jpg':
          case 'png':
          case 'gif':
            div.querySelector('.swipper').innerHTML=`
              <div class="loading"></div>
            `
            const img = new Image()
            img.src = item.src
            img.onload = function () {
              const imgWidth = this.width
              const imgHeight = this.height
              store.imgWidth = imgWidth
              store.imgHeight = imgHeight
              if (imgWidth > (winWidth - 140) || imgHeight > (winHeight - 140)) {
                const hBit = (winHeight - 140) / imgHeight
                const wBit = (winWidth - 140) / imgWidth
                store.scaleNum = wBit > hBit ? hBit : wBit
                store.fullScreen = false
                store.imgLeft = (winWidth - imgWidth * store.scaleNum) / 2
                store.imgTop = (winHeight - imgHeight * store.scaleNum) / 2
              } else {
                store.fullScreen = false
                store.imgLeft = (winWidth - imgWidth) / 2
                store.imgTop = (winHeight - imgHeight) / 2
              }
              const img = document.createElement('img')
              img.src= item.src
              img.style = `
                position: absolute;
                width: ${imgWidth * store.scaleNum}px;
                height: ${imgHeight * store.scaleNum}px;
                top: ${store.imgTop}px;
                left: ${store.imgLeft}px;
                cursor: pointer;
                transition: all ease-in-out .4s;
              `
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

              img.addEventListener('mousewheel', function (e) {
                e.preventDefault()
                const [tempScaleNum, scaleX, scaleY] = [store.scaleNum, e.clientX - store.imgLeft, e.clientY - store.imgTop]
                this.style.transition = 'none'
                if (e.wheelDelta < 0) {
                  _step = -0.08
                  if (tempScaleNum < 0.2) {
                    _step = 0
                  }
                } else {
                  _step = 0.08
                  if (tempScaleNum > 10) {
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
              }, false)
              img.addEventListener('mouseout', function (e) {
                if (this.style.transition.indexOf('none') > -1) {
                  this.style.transition = 'all ease-in-out .4s'
                }
              }, false)
              const timer = setTimeout(() => {
                clearTimeout(timer)
                div.querySelector('.swipper').innerHTML = ''
                div.querySelector('.swipper').appendChild(img)
                mutations.updateScreen()
              }, 100)
            }
            img.onerror = function () {
              console.log('图片跑错了')
            }
            break
        }
      }
    } catch (_) {
    }
  }
}
if (process.env.NODE_ENV !== 'production') {
  document.querySelector('button').addEventListener('click', () => {
    new Preview({
      list: [{
        ext: 'jpeg',
        name: '预览图片',
        src: '/meinv.jpeg'
      }, {
        ext: 'jpeg',
        name: '预览图片',
        src: '/fengjin.jpeg'
      }]
    }).display(0)
  }, false)
}
