/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2021/11/7 上午11:26:12
  @Last Modified by:   tcly861204
  @Last Modified time: 2021/11/15 上午9:12:20
  @Github: https://tcly861204.github.io
*/
// @ts-nocheck
import icon from '@/icon.png'
export default function () {
  return `<footer class="preview-container__footer">
    <section class="preview-container__footer-action">
      <ul>
        <li class="action-item app" data-num="0/0"><span class="icon" style="background-image: url(${icon})"></span></li>
        <li class="action-item fullsceen"><span class="icon" style="background-image: url(${icon})"></span></li>
        <li class="action-item zoomIn"><span class="icon" style="background-image: url(${icon})"></span></li>
        <li class="action-item zoomOut"><span class="icon" style="background-image: url(${icon})"></span></li>
        <li class="action-item rotate"><span class="icon" style="background-image: url(${icon})"></span></li>
      </ul>
    </section>
  </footer>`
}
