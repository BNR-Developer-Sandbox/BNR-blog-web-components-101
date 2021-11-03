import "./photo.js";
import "./fact.js";

customElements.define(
  "wc-photo-gallery-item",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
      return ["image", "fact"];
    }
    set image(str) {
      this.setAttribute("image", str);
    }
    get image() {
      return this.getAttribute("image");
    }

    set fact(str) {
      this.setAttribute("fact", str);
    }
    get fact() {
      return this.getAttribute("fact");
    }

    async connectedCallback() {
      this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
      <wc-photo image="${this.image}"></wc-photo>
      <wc-fact fact="${this.fact}"></wc-fact>
      `;
    }
  }
);
