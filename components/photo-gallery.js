import "./photo.js";

customElements.define(
  "wc-photo-gallery",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
      await this.connected();
      this.render();
    }

    addImages = () => {
      return this.images.map((image) => {
        const ol = this.shadowRoot.getElementById("ol");
        const photo = document.createElement("wc-photo");
        photo.image = image;
        photo.onclick = () => console.log("click handler");
        photo.onprev = () => console.log("prev");
        photo.onnext = () => console.log("next");
        ol.appendChild(photo);
      });
    };

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          ol {
            display: flex;
            flex: 1;
            flex-direction: column;
            max-width: 100vw;
            list-style: none;
            padding: 0;
          }
        </style>
        <ol id="ol">
        </ol>
      `;
      this.addImages();
    }

    // TODO click on current image to open lightbox
  }
);
