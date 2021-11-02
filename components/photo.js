customElements.define(
  "wc-photo",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._image = "";
    }
    set image(str) {
      this._image = str;
    }
    get image() {
      return this._image;
    }

    async connectedCallback() {
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          img {
              width: 100%;
          }
        </style>
        <img src="${this.image}"/>
      `;
    }
  }
);
