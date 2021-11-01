import "/layouts/base.js";
import "/components/photo-gallery.js";

customElements.define(
  "wc-screens-home",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.images = [
        "https://placekitten.com/400/500",
        "https://placekitten.com/400/501",
        "https://placekitten.com/400/502",
        "https://placekitten.com/400/503",
        "https://placekitten.com/400/504",
        "https://placekitten.com/400/505",
        "https://placekitten.com/400/506",
        "https://placekitten.com/400/507",
        "https://placekitten.com/400/508",
        "https://placekitten.com/400/509",
        "https://placekitten.com/400/510",
        "https://placekitten.com/400/511",
        "https://placekitten.com/400/512",
      ];
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
              current="0"
            >
            </wc-photo-gallery>
          </slot>
        </wc-layouts-base>
      `;
    }
  }
);
