customElements.define(
  "wc-button",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    // static get observedAttributes() {
    //   return ["label"];
    // }
    // set label(str) {
    //   this.setAttribute("label", str);
    // }
    // get label() {
    //   return this.getAttribute("label");
    // }

    async connectedCallback() {
      this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
      <style>
        button {
          width: 100%;
        }
      </style>
      <button><slot></slot></button>
      `;
    }
  }
);
