import Icon from '@/assets/icon.png'
export default function () {
  return `
    <header class="preview-container__header">
      <h2 class="title"></h2>
      <div class="icon close" style="background-image: url(${Icon});"></div>
    </header>
  `
}