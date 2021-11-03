customElements.define(
  "wc-button",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

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
          cursor: pointer;
        }
      </style>
      <button><slot></slot></button>
      `;
    }
  }
);
