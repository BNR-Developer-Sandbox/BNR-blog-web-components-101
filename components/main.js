customElements.define(
  'wc-main',
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
        main {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          align-items: center;
          background-color: var(--color-white);
          color: var(--color-black);
          padding: 4rem;
        }
      </style>
      <main>
        <slot name="content">Default Main Content</slot>
      </main>`;
    }
  },
);
