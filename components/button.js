const template = document.createElement("template");
template.innerHTML = `
  <style>
    button {
      font-size: 4em;
      cursor: pointer;
    }
  </style>
  <button><slot></slot></button>
`;

customElements.define(
  "wc-button",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
);
