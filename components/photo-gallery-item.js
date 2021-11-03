import "./photo.js";
import "./fact.js";

const template = document.createElement("template");
template.innerHTML = `
  <wc-photo image="" id="photo"></wc-photo>
  <wc-fact fact="" id="fact"></wc-fact>
`;

customElements.define(
  "wc-photo-gallery-item",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.photoEl = this.shadowRoot.getElementById("photo");
      this.photoEl.image = this.image;
      this.factEl = this.shadowRoot.getElementById("fact");
      this.factEl.fact = this.fact;
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
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === "image") {
        this.photoEl.image = newVal;
      }
      if (attrName === "fact") {
        this.factEl.fact = newVal;
      }
    }
  }
);
