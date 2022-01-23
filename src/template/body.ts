/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/23 下午3:22:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/22 下午10:12:34
  @Github: https://tcly861204.github.io
*/
import Icon from '@/assets/icon.png'
export default function () {
  return `
    <section class="preview-container__body">
      <div class="preview-container__body-btn prev">
        <span class="icon" style="background-image: url(${Icon})"></span>
      </div>
      <div class="swipper">
      </div>
      <div class="preview-container__body-btn next">
        <span class="icon" style="background-image: url(${Icon})"></span>
      </div>
    </section>
  `
}