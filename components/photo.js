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
      let startTouchX = null;
      this.ontouchstart = (e) => (startTouchX = e.touches[0].clientX);
      this.ontouchend = (e) => {
        if (Math.abs(startTouchX - e.changedTouches[0].clientX) > 25) {
          if (startTouchX < e.changedTouches[0].clientX) {
            this.onprev();
          } else {
            this.onnext();
          }
        }
        startTouchX = null;
      };
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          li {
            display: flex;
            flex: 1;
          }
          li img {
            width: 100%;
          }
        </style>
          <li>
            <img src="${this.image}"/>
          </li>
      `;
    }

    // TODO click on current image to open lightbox
  }
);
