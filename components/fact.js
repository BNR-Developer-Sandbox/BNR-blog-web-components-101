const template = document.createElement("template");
template.innerHTML = `
  <style>
    p {
        width: 100%;
    }
  </style>
  <p id="fact">Default Fact</p>
`;

customElements.define(
  "wc-fact",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.factEl = this.shadowRoot.getElementById("fact");
      this.factEl.textContent = this.fact;
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
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === "fact") {
        this.factEl.textContent = newVal;
      }
    }
  }
);
