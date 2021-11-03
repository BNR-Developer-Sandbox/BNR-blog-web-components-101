const template = document.createElement("template");
template.innerHTML = `
  <style>
    img {
        width: 100%;
    }
  </style>
  <img src="https://placekitten.com/400/500" id="image" />
`;

customElements.define(
  "wc-photo",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.imageEl = this.shadowRoot.getElementById("image");
      this.imageEl.src = this.image;
    }
    static get observedAttributes() {
      return ["image"];
    }
    set image(str) {
      this.setAttribute("image", str);
    }
    get image() {
      return this.getAttribute("image");
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === "image") {
        this.imageEl.src = newVal;
      }
    }
  }
);
