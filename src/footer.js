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
