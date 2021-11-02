customElements.define(
  'wc-photo-gallery',
  class extends HTMLElement {
    constructor() {
      super();
      console.log("photo-gallery constructor initHandler", this?.initHandler);
    }

    async connectedCallback() {
      console.log("photo-gallery connectedCallback initHandler", this?.initHandler);
        setTimeout(() => console.log("photo-gallery timeout initHandler", this?.initHandler), 0);
    }

    // TODO click on current image to open lightbox
  }
);
