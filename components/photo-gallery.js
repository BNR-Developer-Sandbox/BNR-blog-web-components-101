customElements.define(
  "wc-photo-gallery",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.handleClick = this.handleClick.bind(this);
    }
    static get observedAttributes() {
      return ["images", "current"];
    }
    get images() {
      const attribute = this.getAttribute("images");
      return JSON.parse(attribute);
    }
    set images(json) {
      const str = JSON.stringify(json);
      this.setAttribute("images", str);
    }

    get current() {
      const attribute = this.getAttribute("current");
      return parseInt(attribute, 10);
    }

    set current(int) {
      this.setAttribute("current", int.toString());
    }

    async connectedCallback() {
      this.render();
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }

    getImageClass(index) {
        if (this.current === index) {
            return "current";
        } else if (this.current - 1 === index) {
            return "previous";
        } else if (this.current + 1 === index) {
            return "next";
        }
        return "";
    }

    handleClick(e) {
        this.current = e.target.getAttribute("data-index");
    }

    render() {
      this.shadowRoot.getElementById("list")?.removeEventListener("click", this.handleClick, true);
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
        li.placeholder {
          display: flex;
          height: 500px;
          width: 500px;
          transform: scale(0.5);
          opacity: 0.5;
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
      <ol id="list">
        ${this.current === 0 ? `<li class="placeholder"></li>` : ""}
        ${this.images
          .map((image, index) => {
            return `
          <li class="${this.getImageClass(index)}">
            <img src="${image}" data-index="${index}" />
          </li>`;
          })
          .join("")}
        ${this.current === this.images.length - 1 ? `<li class="placeholder"></li>` : ""}
      </ol>`;
      this.shadowRoot.getElementById("list").addEventListener("click", this.handleClick, true);
    }
  }
);
