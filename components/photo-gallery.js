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
      // console.log("js", this.images);
    }

    render() {
      this.shadowRoot.innerHTML = `
        <ol>
          ${this.images
            .slice(0, 1)
            .map((image) => {
              console.log("map start");
              const photo = document.createElement("wc-photo");
              photo.image = image;
              photo.onclick = () => console.log("click handler");
              photo.onprev = () => console.log("prev");
              photo.onnext = () => console.log("next");
              console.log("map end");
              return photo.outerHTML;
            })
            .join("")}
        </ol>
      `;
    }

    // TODO click on current image to open lightbox
  }
);
