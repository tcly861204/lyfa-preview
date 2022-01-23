/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2021/11/7 上午11:25:21
  @Last Modified by:   tcly861204
  @Last Modified time: 2021/11/14 下午5:25:40
  @Github: https://tcly861204.github.io
*/
// @ts-nocheck
import Icon from './icon.png'
export default function () {
  return `
    <header class="preview-container__header">
      <h2 class="title"></h2>
      <div class="download"><i class="omd omd-file-download"></i></div>
      <div class="icon close" style="background-image: url(${Icon});"></div>
    </header>
  `
}