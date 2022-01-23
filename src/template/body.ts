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