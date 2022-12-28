class NewList extends HTMLUListElement {
  constructor() {
    super();
    const ul = document.querySelector('ul');
    ul.setAttribute('class', 'wrapper');
    const lis = Array.from(this.querySelectorAll("li"));
    lis.forEach((li) => {
      li.style.height = "32px";
      li.style.lineHeight = "32px";
      li.style.listStyle = "none";
      li.style.borderBottom = "1px solid #ccc";
    });
  }
}

customElements.define("new-list", NewList, { extends: "ul" });
