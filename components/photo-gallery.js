import "./photo-gallery-item.js";

customElements.define(
  "wc-photo-gallery",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      this.touchStartX = null;

      this.addEventListener("click", this.onclick);
      this.addEventListener("touchstart", this.ontouchstart);
      this.addEventListener("touchend", this.ontouchend);

      if (!this.hasAttribute("index")) {
        this.index = 0;
      }

      if (!this.hasAttribute("images")) {
        this.images = [];
      }
    }

    static get observedAttributes() {
      return [
        "index",
        "images",
      ];
    }

    set index(int) {
      this.setAttribute("index", int.toString());
    }
    get index() {
      return parseInt(this.getAttribute("index"), 10);
    }

    set images(arr) {
      this.setAttribute("images", JSON.stringify(arr));
    }
    get images() {
      return JSON.parse(this.getAttribute("images"));
    }

    async connectedCallback() {
      this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      // console.log("attrName", attrName, "oldVal", oldVal, "newVal", newVal);
      this.render();
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.onclick);
      this.removeEventListener("touchstart", this.ontouchstart);
      this.removeEventListener("touchend", this.ontouchend);
    }

    onclick(event) {
      const prev = this.shadowRoot.getElementById("prev");
      const next = this.shadowRoot.getElementById("next");
      if (event.path.includes(prev)) {
        this.decrement();
      }
      if (event.path.includes(next)) {
        this.increment();
      }
    }

    ontouchstart(event) {
      const current = this.shadowRoot.getElementById("current");
      if (event.path.includes(current)) {
        const { clientX } = event.changedTouches[0];
        this.touchStartX = clientX;
      }
    }
    ontouchend(event) {
      const current = this.shadowRoot.getElementById("current");
      if (event.path.includes(current)) {
        const { clientX } = event.changedTouches[0];
        if (this.touchStartX < clientX) {
          this.decrement();
        } else {
          this.increment();
        }
        this.touchStartX = null;
      }
    }

    increment() {
      const max = this.images.length - 1;
      const next = this.index + 1;
      const index = Math.min(max, next);
      if (index > this.index) {
        this.index = index;
      }
      if (next >= max) {
        this.fetchNext();
      }
    }
    decrement() {
      const min = 0;
      const prev = this.index - 1;
      const index = Math.max(min, prev);
      if (index < this.index) {
        this.index = index;
      }
      if (prev <= min) {
        this.fetchPrev();
      }
    }

    fetchPrev() {
      console.log("photo-gallery.js: fetchPrev() - override to implement");
    }

    fetchNext () {
      console.log("photo-gallery.js: fetchNext() - override to implement");
    }

    renderStyles() {
      return `
      <style>
      ol {
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        max-width: 100vw;
      }
      li {
        max-width: 100vw;
      }
      li#prev, li#next,
      li#prev-preload, li#next-preload {
        flex: 0;
      }
      </style>
      `;
    }
    renderList() {
      return `
      <ol id="list" class="${this.animation}">
        <slot name="items"></slot>
      </ol>
      `;
    }
    renderImage(id, image) {
      if (image) {
        return `
        <li id="${id}">
          <wc-photo
            id="${id}-photo"
            image="${image}"
          ></wc-photo>
        </li>
        `;
      } else {
        return "";
      }
    }
    render() {
      this.shadowRoot.innerHTML = `
        <slot></slot>
      `;
    }
  }
);
