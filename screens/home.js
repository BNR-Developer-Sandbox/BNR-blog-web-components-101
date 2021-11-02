import "/layouts/base.js";
import "/components/photo-gallery-bak.js";

customElements.define(
  "wc-screens-home",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      const dogDomain = "place.dog";
      const catDomain = "placekitten.com";
      const domain = Math.round(Math.random()) ? catDomain : dogDomain;
      this.images = [];
      for (let step=0; step < 10; step++) {
        const width = Math.floor(Math.random() * (600 - 400 + 1) + 400);
        const height = Math.floor(Math.random() * (600 - 400 + 1) + 400);
        this.images.push(`http://${domain}/${width}/${height}`);
      }
      this.render();
    }
    async connectedCallback() {
      const photoGallery = this.shadowRoot.getElementById("photo-gallery");
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
              initHandler
              prevHandler
              nextHandler
            >
            </wc-photo-gallery>
          </slot>
        </wc-layouts-base>
      `;
    }
  }
);
