/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/23 下午3:22:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/23 下午2:38:19
  @Github: https://tcly861204.github.io
*/
import { store, Mutations } from '@/store'
import Header from '@/template/header'
import Body from '@/template/body'
import Footer from '@/template/footer'
import RenderPrev from './prev'
import RenderNext from './next'
import { on } from '@/libs/utils'
import { bindCloseEvent, bindIconEvent } from '@/render/event'
export default class Layout {
  constructor () {
    this.init()
    on(window, 'keydown', Mutations.handleKeyEvents)
    RenderNext()
    RenderPrev()
    bindCloseEvent()
    bindIconEvent()
  }

  private init () {
    store.dom = document.createElement('div')
    store.dom.className = 'preview-container__mask'
    store.dom.innerHTML = `<section class="preview-container">
      ${Header()}
      ${Body()}
      ${Footer()}
    </section>`
    document.body.appendChild(store.dom)
  }
}