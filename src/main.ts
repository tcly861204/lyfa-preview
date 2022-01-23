/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/23 下午3:22:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/23 下午2:17:00
  @Github: https://tcly861204.github.io
*/
import { store } from '@/store'
import '@/style/global.scss'
import Layout from '@/render/layout'
import Core from '@/core/index'

type Item = {
  ext: string,
  name: string,
  src: string
}

type CallBack = () => void

type Option = {
  list: Array<Item>,
  // 扩展还未实现
  extend?: (type: string, callback: CallBack) => void
}

class Preview extends Core {
  constructor (option: Option) {
    super()
    store.app = this
    store.index = 0
    store.list = option.list
    store.len = store.list.length
  }
  public display (index: number = 0): void {
    store.index = index > store.len - 1 ? 0 : index
    if (!this.isLayout) {
      this.isLayout = true
      new Layout()
    }
    this.updateNum()
    try {
      const item = store.list[store.index]
      this.updateTitle(item)
      store.rotateNum = 0
      store.scaleNum = 1
      store.imgLeft = 0
      store.imgTop = 0
      store.fullScreen = true
      if (item.ext) {
        switch (item.ext.toLocaleLowerCase()) {
          case 'jpeg':
          case 'jpg':
          case 'png':
          case 'gif':
            this.render(item)
            break
          default:
            console.log('暂不支持图片以外格式预览')
            break
        }
      }
    } catch (_) {
    }
  }
}
if (import.meta.env.MODE !== 'production') {
  document.querySelector('#preview')?.addEventListener('click', function () {
    new Preview({
      list: [{
        ext: 'jpeg',
        name: '预览图片',
        src: '/public/meinv.jpeg'
      }, {
        ext: 'jpeg',
        name: '预览图片',
        src: '/public/fengjin.jpeg'
      }]
    }).display(0)
  }, false)
}

export default Preview