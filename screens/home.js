import "/layouts/base.js";
import "/components/photo-gallery.js";

customElements.define(
  'wc-screens-home',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.images = [
        "https://placekitten.com/400/500",
        "https://placekitten.com/400/501",
        "https://placekitten.com/400/502"
      ];
      console.log("this.images", this.images);
      console.log("JSON.stringify(this.images)", JSON.stringify(this.images));
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `
        <wc-layouts-base>
          <slot slot="title">Web Components 101</slot>
          <slot slot="content">
            <wc-photo-gallery
              images=${JSON.stringify(this.images)}
            >
            </wc-photo-gallery>
          </slot>
        </wc-layouts-base>
      `;
    }
  },
);
