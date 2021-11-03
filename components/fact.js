customElements.define(
  "wc-fact",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
      return ["fact"];
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
      <style>
        p {
            width: 100%;
        }
      </style>
      <p>${this.fact}</p>
      `;
    }
  }
);
