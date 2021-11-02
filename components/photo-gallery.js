customElements.define(
  'wc-photo-gallery',
  class extends HTMLElement {
    constructor() {
      super();
    }

    async connectedCallback() {
      this.connected();
      this.innerHTML = `
        <ol>
          <li>prev</li>
          <li>current</li>
          <li>next</li>
        </ol>
      `;
    }

    // TODO click on current image to open lightbox
  }
);
