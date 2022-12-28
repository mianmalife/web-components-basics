class PopUpInfo extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder']
  }
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });

    let wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    let placeholder = document.createElement('span');
    placeholder.setAttribute('class', 'place')
    let icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0)
    let img = document.createElement("img");
    let info = document.createElement("span");
    info.setAttribute("class", "info");
    icon.appendChild(img);

    const styles = document.createElement('style')
    styles.textContent = `
      .wrapper {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 40px;
      }
      .wrapper .icon {
        width: 1.5rem;
        height: 1.5rem;
      }
      .wrapper .icon img {
        width: 100%;
        height: 100%;
      }
      .wrapper .info {
        position: absolute;
        bottom: 40px;
        opacity: 0;
        transition: .5s all;
        background-color: #fff;
        border: 1px solid #ccc;
      }
      .wrapper .icon:hover + .info, .wrapper .icon:focus + .info {
        opacity: 1;
      }
    `

    const text = this.getAttribute("data-text");
    const placeholderText = this.getAttribute('placeholder');
    const imgSrc = this.getAttribute("img");

    img.src = imgSrc;
    info.textContent = text;
    placeholder.textContent = placeholderText;

    shadow.appendChild(styles);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
    wrapper.appendChild(placeholder);
  }
  connectedCallback() {
    console.log('connectedCallback')
    updateStyle(this)
  }
  disconnectedCallback() {
    console.log('disconnectedCallback')
  }
  adoptedCallback() {
    console.log('adoptedCallback')
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue)
    updateStyle(this)
  }
}
customElements.define('popup-info', PopUpInfo)

let popup
function updateStyle(ele) {
  const newText = ele.getAttribute('data-text')
  const newImg = ele.getAttribute('img')
  const newPlaceholder = ele.getAttribute('placeholder')
  ele.shadowRoot.querySelector('img').src = newImg
  ele.shadowRoot.querySelector('.info').textContent = newText
  ele.shadowRoot.querySelector('.place').textContent = newPlaceholder
}
const add = document.querySelector('.add')
const remove = document.querySelector('.remove')
const update = document.querySelector('.update')

add.onclick = function() {
  popup = document.createElement('popup-info')
  popup.setAttribute('data-text', 'hello, new ele!')
  popup.setAttribute('img', './images/tip.png')
  popup.setAttribute('placeholder', '这是新加的组件')
  document.querySelector('.demo').appendChild(popup)
}
remove.onclick = function() {
  const demo = document.querySelector('.demo')
  const lastChild = demo.children[demo.children.length - 1]
  if (lastChild) demo.removeChild(lastChild)
}
update.onclick = function() {
  popup.setAttribute('placeholder', '更新了')
}

