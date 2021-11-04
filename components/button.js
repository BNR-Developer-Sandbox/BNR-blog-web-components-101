const template = document.createElement("template");
template.innerHTML = `
  <style>
    button {
      font-size: 4em;
      cursor: pointer;
    }
  </style>
  <button id="button"><slot></slot></button>
`;

customElements.define(
  "wc-button",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ["disabled"];
    }
    set disabled(str) {
      this.setAttribute("disabled", str);
    }
    get disabled() {
      return this.getAttribute("disabled");
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === "disabled") {
        this.shadowRoot.getElementById("button").disabled =
          newVal === "true" ? true : false;
      }
    }
  }
);
