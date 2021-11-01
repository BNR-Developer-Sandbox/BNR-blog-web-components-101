customElements.define(
  'wc-photo-gallery',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.currentImage = 0;
    }
    static get observedAttributes() { return ["images"]; }
    get images() {
      const attribute = this.getAttribute("images");
      console.log(attribute);
      const json = JSON.parse(attribute);
      console.log(json);
      return json;
    }
    set images(json) {
      console.log(json);
      const str = JSON.stringify(json);
      console.log(str);
      this.setAttribute("images", str);
    }
    async connectedCallback() {
      console.log("connectedCallback", this.images);
      this.render();
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `
      <style type="text/css">
        ol {
          display: flex;
          flex-direction: row;
          flex-grow: 1;
          align-items: center;
          list-style: none;
          background-color: var(--color-white);
          color: var(--color-black);
          padding: 4rem;
        }
        li {
          display: none;
        }
        li.previous {
          display: flex;
          transform: scale(0.5);
          opacity: 0.5;
        }
        li.current {
          display: flex;
        }
        li.next {
          display: flex;
          transform: scale(0.5);
          opacity: 0.5;
        }
      </style>
      <ol>
        ${this.images.map((image, index) => {
          console.log("image", image, "index", index, "this.currentImage", this.currentImage);
          let className = "";
          if (this.currentImage === index) {
            className = "current"
          } else if (this.currentImage - 1 === index) {
            className = "previous"
          } else if (this.currentImage + 1 === index) {
            className = "next"
          } else {
            className = "";
          }
          return `
          <li class="${className}">
            <img src="${image}" />
          </li>`;
        }).join("")}
        <!--
        <li class="current">
          <img src="https://placekitten.com/500/501" />
        </li>
        <li class="next">
          <img src="https://placekitten.com/500/502" />
        </li>
        <li>
          <img src="https://placekitten.com/500/503" />
        </li>
        -->
      </ol>`;
    }
  },
);
