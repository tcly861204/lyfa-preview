/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/23 下午3:22:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/22 下午10:09:10
  @Github: https://tcly861204.github.io
*/
import Icon from '@/assets/icon.png'
export default function () {
  return `<footer class="preview-container__footer">
    <section class="preview-container__footer-action">
      <ul>
        <li class="action-item app" data-num="0/0"><span class="icon" style="background-image: url(${Icon})"></span></li>
        <li class="action-item fullsceen"><span class="icon" style="background-image: url(${Icon})"></span></li>
        <li class="action-item zoomIn"><span class="icon" style="background-image: url(${Icon})"></span></li>
        <li class="action-item zoomOut"><span class="icon" style="background-image: url(${Icon})"></span></li>
        <li class="action-item rotate"><span class="icon" style="background-image: url(${Icon})"></span></li>
      </ul>
    </section>
  </footer>`
}