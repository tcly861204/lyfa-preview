const findNode = (cls) => {
  return store.dom.querySelector(cls);
};
const on = function() {
  return function(element, event, handler) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false);
    }
  };
}();
const off = function() {
  return function(element, event, handler) {
    if (element && event) {
      element.removeEventListener(event, handler, false);
    }
  };
}();
const store = {
  app: null,
  index: 0,
  len: 0,
  list: [],
  dom: null,
  imgWidth: null,
  imgHeight: null,
  rotateNum: 0,
  scaleNum: 1,
  imgLeft: 0,
  imgTop: 0,
  fullScreen: true,
  btns: {
    prev: null,
    next: null
  }
};
class Mutations {
  static handleKeyEvents(e) {
    try {
      switch (e.code.toLocaleLowerCase()) {
        case "escape":
          window.removeEventListener("keydown", Mutations.handleKeyEvents, false);
          store.dom.parentNode.removeChild(store.dom);
          break;
        case "keya":
        case "arrowleft":
          Mutations.handlePrev();
          break;
        case "keyd":
        case "arrowright":
          Mutations.handleNext();
          break;
      }
    } catch (_) {
    }
  }
  static updateScreen() {
    const img = findNode(".swipper img");
    const fullsceen = findNode(".action-item.fullsceen .icon");
    store.fullScreen = parseInt(img.style.width) >= window.innerWidth || parseInt(img.style.height) >= window.innerHeight;
    fullsceen.style.backgroundPosition = `${store.fullScreen ? "-28px -27px" : "-28px 0"}`;
  }
  static handlePrev() {
    if (this.animation) {
      return;
    }
    this.animation = true;
    const img = findNode(".swipper img");
    img.setAttribute("class", "animated fadeOutRight");
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.animation = false;
      const index = store.index === 0 ? store.len - 1 : store.index - 1;
      store.app.display(index);
    }, 500);
  }
  static handleNext() {
    if (this.animation) {
      return;
    }
    this.animation = true;
    const img = findNode(".swipper img");
    img.setAttribute("class", "animated fadeOutLeft");
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.animation = false;
      const index = store.index === store.len - 1 ? 0 : store.index + 1;
      store.app.display(index);
    }, 500);
  }
  static handleFullScreen() {
    const fullsceen = findNode(".action-item.fullsceen .icon");
    const img = findNode(".swipper img");
    let hBit = 1;
    let wBit = 1;
    if (store.fullScreen) {
      store.fullScreen = false;
      hBit = (window.innerHeight - 140) / store.imgHeight;
      wBit = (window.innerWidth - 140) / store.imgWidth;
      store.scaleNum = wBit > hBit ? hBit : wBit;
    } else {
      store.fullScreen = true;
      hBit = window.innerHeight / store.imgHeight;
      wBit = window.innerWidth / store.imgWidth;
      store.scaleNum = wBit > hBit ? wBit : hBit;
    }
    const scaleWidth = store.imgWidth * store.scaleNum;
    const scaleHeight = store.imgHeight * store.scaleNum;
    store.imgLeft = (window.innerWidth - scaleWidth) / 2;
    store.imgTop = (window.innerHeight - scaleHeight) / 2;
    img.style.width = `${scaleWidth}px`;
    img.style.height = `${scaleHeight}px`;
    img.style.top = `${store.imgTop}px`;
    img.style.left = `${store.imgLeft}px`;
    fullsceen.style.backgroundPosition = `${store.fullScreen ? "-28px -27px" : "-28px 0"}`;
  }
  static handleRotate() {
    const img = findNode(".swipper img");
    store.rotateNum -= 90;
    img.style.transform = `rotate(${store.rotateNum}deg)`;
  }
  static handlerZoom(type) {
    const img = findNode(".swipper img");
    if (type === "in") {
      if (store.scaleNum + 0.2 < 3) {
        store.scaleNum += 0.2;
      } else {
        return false;
      }
    }
    if (type === "out") {
      if (store.scaleNum - 0.2 > 0.2) {
        store.scaleNum -= 0.2;
      } else {
        return false;
      }
    }
    const scaleWidth = store.imgWidth * store.scaleNum;
    const scaleHeight = store.imgHeight * store.scaleNum;
    store.imgLeft = store.imgLeft + (parseInt(img.style.width) - scaleWidth) / 2;
    store.imgTop = store.imgTop + (parseInt(img.style.height) - scaleHeight) / 2;
    img.style.width = `${scaleWidth}px`;
    img.style.height = `${scaleHeight}px`;
    img.style.top = `${store.imgTop}px`;
    img.style.left = `${store.imgLeft}px`;
    this.updateScreen();
  }
}
Mutations.animation = false;
var global = "";
var Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAAAzCAYAAABSfnBXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyY2U1ODBmMi04NGJmLTA1NGUtODYzMC1jMmJlOWJiZjExYjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjY3OEE5QzI0NTJGMTFFQ0JBODlGNjA0NTc5MkJDRkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjY3OEE5QzE0NTJGMTFFQ0JBODlGNjA0NTc5MkJDRkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4Y2Y1MDY2LTEwNWUtYzQ0Ni1hYTZmLWMyZmI1NjA3MDhkNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyY2U1ODBmMi04NGJmLTA1NGUtODYzMC1jMmJlOWJiZjExYjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6V3BHuAAAFZklEQVR42uycXWgcVRTHZ7spRhtqbaVBUCzEh/gghRKU2AcxSEVBlGjzoMQ+hEQUS5HEPlgEsRalm60+CGqJUoliWY2+WSooPlgrKBb0IQEp/fClTVChtlaabKf/w/6HXsadZma8s7t35xz4MR/33jMfe+bMvWfu2YLv+56KSlhW6C1QUcNQUcOIKYNgCsyCS1xOcb8aRkj8EGn3xxU/grT14kg3KIEKGAG9YCWXI9xfYj3bsgeszUDvczzvpFJh29DdRuczRFjS7o9LlKStF4eS0X4GjIBeLmeMslJK/VEcAlUwalmvR70ilQRtKmxTDZe1kmE0qt0gWGLbCVAMlRe532e9QYs/3gFwDiyAXWC9Rd2bqTuucQRGcY5tc28YU4anKIb0mcYReI4py0+2eKV/DMO0qbsvpnGYRtFXr069PkYhRNr9rSqbufwSVCPqVFlu1rclB8E+ru8Eo6DTku6fwABYAlvBIugzyvu4byvrDLCNF6eP0Wga7TEusV3vNfouHst91rd9zdeDMXCWx9gDuix7jkXqXuR2vX2ROlphVJLW06RtdzzkCUw9wfoKo/x4Bl7rItgP9nJ7HDxlUb94gX56hQ7wA+ngvv5IT5HjOMYRLh8GxYg614FHQvWzkGnwMt37O5Z1B8ZR5XUWub6sUeTVMIK+hQSxXjCMI/Aasr0DPAouG30NjXy2uXwO3uR6OMgVBLdeZ7lEQ1dleC7DYDeDa89a1i0dzaOGpwg8x9FQh9TTzudVuhm8WorofMr+Oa5fBsN563zm1TDMYJfEKWY5+pjldhDUmjeMY5ul610FXqPeeUZBOzM2ijhluQ9wJeV341j35SXApYaRzDgugLs1JN6+H9HS8DOPJ0/76nb/iKYTdeLLJvAp+BfclVLHQ+ANMJPB+W3n+Q0laDPENtv/Ez3UOZ+J5XnwGTjTzhephqGiAS4VNQwVNQwVNQwVNQwVNQwVNQyVdjaMNeBjvXVqGKbcD34BT7bJ9WuKYpTE/Ngi8wUmjQ81ImWwpYHzM2x+NIszUafEell/nFvLiTpeK7HchJIC1z+KuIF/02A2OGYYzUpRrMcoH7hDLhhGD9jBJ6ZAj1EOeYzDxvq0RePI2jCamaJosp5zMhY4J+KAC4ZR4aSUd8E6w3MMgNO8aTJHcRyc4PakI4YRlaLoNShFMWDCmN8x0mqvknqdzwnwBLjBq02f/8O7mkj0DdgIPgHnQRm8zbJnwJY03RwvWcLS/01wanaKoqQjSlriTm5LuuJBF0Yla3jDZb7BK3XK/wqNSt4DX4Eu8KAD/e0eLo9EGJofKu+xeGy5R5JgtJ/HkYdJ/i/jgguGITfkrFfLkpqPoUM8x2Gu35viHAoRpK23nESlKJpklaIoaYjjXN9LA7noShzjO3APeDWBnu+5vNMBj9HMFEVJQ1yk15h2LcDVwUDWjW0auolKUQxEUxQjDONr8CF4K4Ge4BUy68A1NzNFUdIQJR1R0hKHXYt8/shh1ElwU4yhTZcR0yg7kj7QrBTFLkY5faYnjjFd0XNhuCpPlPyHwm/g9hi2FQxTzU5oq4t0rl/0atPn3wdzfPfPcXuIHmSBnVHxoNssHPc8vcUY9cqIbpeXbeK01W8l+8AtYCXYCG6uU2cdI3euBbianaLoRIDrWh92OnkjToEz4AujvB/86mhIvJkpis6ExKM+u//JUYl0xm71an+E+phRLn/qdQeDNGUOv062cSf9NnCM0eBvwWoLOucZ3HqJr5LuVrrgjmXew09zpPE4I6KByLv4A3ACTOZkBLeJI5YHvFqKoq34hqQrbmBfo2VEM9GSi6YoquRXdDKwihqGSny5IsAAQEF7ge9LblUAAAAASUVORK5CYII=";
function Header() {
  return `
    <header class="preview-container__header">
      <h2 class="title"></h2>
      <div class="icon close" style="background-image: url(${Icon});"></div>
    </header>
  `;
}
function Body() {
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
  `;
}
function Footer() {
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
  </footer>`;
}
function RenderPrev() {
  const next = findNode(".prev");
  next.style.display = store.len > 1 ? "block" : "none";
  on(next, "click", Mutations.handlePrev);
}
function RenderNext() {
  const next = findNode(".next");
  next.style.display = store.len > 1 ? "block" : "none";
  on(next, "click", Mutations.handleNext);
}
const bindCloseEvent = function() {
  const closeNode = findNode("div.close");
  on(closeNode, "click", () => {
    try {
      const imgNode = findNode(".swipper img");
      imgNode.setAttribute("class", "animated bounceOut");
      const timer = setTimeout(() => {
        clearTimeout(timer);
        off(window, "keydown", Mutations.handleKeyEvents);
        store.dom.parentNode.removeChild(store.dom);
      }, 900);
    } catch (_) {
    }
  });
};
const bindIconEvent = function() {
  const fullsceen = findNode(".action-item.fullsceen");
  const zoomIn = findNode(".action-item.zoomIn");
  const zoomOut = findNode(".action-item.zoomOut");
  const rotate = findNode(".action-item.rotate");
  on(fullsceen, "click", Mutations.handleFullScreen);
  on(rotate, "click", Mutations.handleRotate);
  on(zoomIn, "click", () => Mutations.handlerZoom("in"));
  on(zoomOut, "click", () => Mutations.handlerZoom("out"));
};
class Layout {
  constructor() {
    this.init();
    on(window, "keydown", Mutations.handleKeyEvents);
    RenderNext();
    RenderPrev();
    bindCloseEvent();
    bindIconEvent();
  }
  init() {
    store.dom = document.createElement("div");
    store.dom.className = "preview-container__mask";
    store.dom.innerHTML = `<section class="preview-container">
      ${Header()}
      ${Body()}
      ${Footer()}
    </section>`;
    document.body.appendChild(store.dom);
  }
}
function Loading() {
  return '<div class="loading"></div>';
}
class Core {
  constructor() {
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.isLayout = false;
  }
  updateNum() {
    const appNode = findNode(".action-item.app");
    appNode.setAttribute("data-num", `${store.index + 1}/${store.len}`);
  }
  updateTitle(item) {
    const titleNode = findNode("h2.title");
    titleNode.innerHTML = item.name;
  }
  render(item) {
    const swipper = findNode(".swipper");
    swipper.innerHTML = Loading();
    const img = new Image();
    const self = this;
    img.src = item.src;
    img.onload = function() {
      const imgWidth = img.width;
      const imgHeight = img.height;
      store.imgWidth = imgWidth;
      store.imgHeight = imgHeight;
      if (imgWidth > self.winWidth - 140 || imgHeight > self.winHeight - 140) {
        const hBit = (self.winHeight - 140) / imgHeight;
        const wBit = (self.winWidth - 140) / imgWidth;
        store.scaleNum = wBit > hBit ? hBit : wBit;
        store.fullScreen = false;
        store.imgLeft = (self.winWidth - imgWidth * store.scaleNum) / 2;
        store.imgTop = (self.winHeight - imgHeight * store.scaleNum) / 2;
      } else {
        store.fullScreen = false;
        store.imgLeft = (self.winWidth - imgWidth) / 2;
        store.imgTop = (self.winHeight - imgHeight) / 2;
      }
      self.renderImage(item, imgWidth, imgHeight);
    };
  }
  renderImage(item, imgWidth, imgHeight) {
    const img = document.createElement("img");
    let _step = null;
    img.src = item.src;
    img.setAttribute("style", `
      position: absolute;
      width: ${imgWidth * store.scaleNum}px;
      height: ${imgHeight * store.scaleNum}px;
      top: ${store.imgTop}px;
      left: ${store.imgLeft}px;
      cursor: pointer;
      transition: all ease-in-out .2s;
    `);
    img.addEventListener("mousedown", function(e) {
      e.preventDefault();
      this.style.cursor = "move";
      this.style.transition = "none";
      const dis = {
        x: e.clientX,
        y: e.clientY,
        gx: store.imgLeft,
        gy: store.imgTop
      };
      document.onmousemove = (ev) => {
        store.imgLeft = dis.gx + (ev.clientX - dis.x);
        store.imgTop = dis.gy + (ev.clientY - dis.y);
        this.style.left = `${store.imgLeft}px`;
        this.style.top = `${store.imgTop}px`;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.style.cursor = "pointer";
        this.style.transition = "all ease-in-out .2s";
      };
    }, false);
    on(img, "mousewheel", function(e) {
      e.preventDefault();
      const [tempScaleNum, scaleX, scaleY] = [store.scaleNum, e.clientX - store.imgLeft, e.clientY - store.imgTop];
      this.style.transition = "none";
      if (e.deltaY < 0) {
        _step = 0.08;
        if (tempScaleNum > 10) {
          _step = 0;
        }
      } else {
        _step = -0.08;
        if (tempScaleNum < 0.2) {
          _step = 0;
        }
      }
      store.scaleNum += _step;
      store.imgTop -= (store.scaleNum / tempScaleNum - 1) * scaleY;
      store.imgLeft -= (store.scaleNum / tempScaleNum - 1) * scaleX;
      this.style.left = `${store.imgLeft}px`;
      this.style.top = `${store.imgTop}px`;
      this.style.width = `${imgWidth * store.scaleNum}px`;
      this.style.height = `${imgHeight * store.scaleNum}px`;
    });
    on(img, "mouseout", function(e) {
      if (this.style.transition.indexOf("none") > -1) {
        this.style.transition = "all ease-in-out .4s";
      }
    });
    const timer = setTimeout(() => {
      clearTimeout(timer);
      const swipper = findNode(".swipper");
      swipper.innerHTML = "";
      swipper.appendChild(img);
      Mutations.updateScreen();
    }, 100);
  }
}
class Preview extends Core {
  constructor(option) {
    super();
    store.app = this;
    store.index = 0;
    store.list = option.list;
    store.len = store.list.length;
  }
  display(index = 0) {
    store.index = index > store.len - 1 ? 0 : index;
    if (!this.isLayout) {
      this.isLayout = true;
      new Layout();
    }
    this.updateNum();
    try {
      const item = store.list[store.index];
      this.updateTitle(item);
      store.rotateNum = 0;
      store.scaleNum = 1;
      store.imgLeft = 0;
      store.imgTop = 0;
      store.fullScreen = true;
      if (item.ext) {
        switch (item.ext.toLocaleLowerCase()) {
          case "jpeg":
          case "jpg":
          case "png":
          case "gif":
            this.render(item);
            break;
          default:
            console.log("\u6682\u4E0D\u652F\u6301\u56FE\u7247\u4EE5\u5916\u683C\u5F0F\u9884\u89C8");
            break;
        }
      }
    } catch (_) {
    }
  }
}
export { Preview as default };
