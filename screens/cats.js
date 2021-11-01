import "/layouts/base.js";
import "/components/photo-gallery.js";

customElements.define(
  "wc-screens-cats",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.images = [];
    }
    static get observedAttributes() { return ["loading", "images"]; }
    get loading() {
      return JSON.parse(this.getAttribute("loading"));
    }
    set loading(v) {
      this.setAttribute("loading", JSON.stringify(v));
    }
    get images() {
      return JSON.parse(this.getAttribute("images"));
    }
    set images(v) {
      this.setAttribute("images", JSON.stringify(v));
    }
    async fetchCats() {
      this.loading = true;
      const response = await fetch("/api/cats");
      const json = await response.json();
      this.images = this.images.concat(json);
      this.loading = false;
    }
    async connectedCallback() {
      // addEventListener
      await this.fetchCats();
      // console.log("images", this.images);
      this.render();
    }
    disconnectedCallback() {
      // abort any api calls in flight
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }
    render() {
      // TODO how to pass fetchCats as a function handler to be used on prev/next clicks
      this.shadowRoot.innerHTML = `
        <wc-layouts-base>
          <slot slot="title">Cats Photo Gallery</slot>
          <slot slot="content">
            <wc-photo-gallery
              images=${JSON.stringify(this.images)}
              current="5"
            >
            </wc-photo-gallery>
          </slot>
        </wc-layouts-base>
      `;
    }
  }
);
