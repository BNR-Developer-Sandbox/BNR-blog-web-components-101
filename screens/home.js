import "/layouts/base.js";
import "/components/photo-gallery.js";

customElements.define(
  'wc-screens-home',
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
        <wc-layouts-base>
          <slot slot="title">Web Components 101</slot>
          <slot slot="content">
            <wc-photo-gallery>
            </wc-photo-gallery>
          </slot>
        </wc-layouts-base>
      `;
    }
  },
);
