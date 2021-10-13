customElements.define(
  "wc-footer",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
      <style type="text/css">
        footer {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background-color: var(--color-black);
          color: var(--color-white);
          padding: 2rem;
        }
      </style>
      <footer>
        &copy; 2021
      </footer>`;
    }
  },
);
