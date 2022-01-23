/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2021/11/7 下午2:53:47
  @Last Modified by:   tcly861204
  @Last Modified time: 2021/11/14 上午11:58:32
  @Github: https://tcly861204.github.io
*/
// @ts-nocheck
import icon from '@/icon.png'
export default function () {
  return `
    <section class="preview-container__body">
      <div class="preview-container__body-btn prev">
        <span class="icon" style="background-image: url(${icon})"></span>
      </div>
      <div class="swipper">
      </div>
      <div class="preview-container__body-btn next">
        <span class="icon" style="background-image: url(${icon})"></span>
      </div>
    </section>
  `
}