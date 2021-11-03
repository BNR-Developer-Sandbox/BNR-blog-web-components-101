customElements.define(
  "wc-photo",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
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

    async connectedCallback() {
      this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }

    render() {
      if (this.image && this.image !== "undefined") {
        this.shadowRoot.innerHTML = `
        <style>
          img {
              width: 100%;
          }
        </style>
        <img src="${this.image}" />
        `;
      } else {
        this.shadowRoot.innerHTML = `
        <b>no image</b>
        `;
      }
    }
  }
);
