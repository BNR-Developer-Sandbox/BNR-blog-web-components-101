customElements.define(
  'wc-header',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `
      <style type="text/css">
        header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background-color: var(--color-black);
          color: var(--color-white);
          padding: 2rem 1rem;
        }
      </style>
      <header>
        <slot name="title">Default Header Title Slot</slot>
      </header>`;
    }
  },
);
