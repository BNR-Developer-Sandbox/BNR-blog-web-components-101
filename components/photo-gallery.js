import "./photo.js";

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

      if (!this.hasAttribute("animation")) {
        this.animation = "";
      }
    }

    static get observedAttributes() {
      return [
        "index",
        "images",
        "animation",
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

    set animation(str) {
      this.setAttribute("animation", str);
    }
    get animation() {
      return this.getAttribute("animation");
    }

    async connectedCallback() {
      this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      console.log(
        "attrName", attrName,
        "oldVal", oldVal,
        "newVal", newVal,
      );
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
      const duration = 1000;
      const max = this.images.length - 1;
      const next = this.index + 1;
      const index = Math.min(max, next);
      if (index > this.index) {
        setTimeout(() => {
          console.log("increment animation end");
          this.animation = "";
          this.index = index;
        }, duration);
        this.animation = "increment";
      }
      if (next >= max) {
        this.fetchNext();
      }
    }
    decrement() {
      const duration = 1000;
      const min = 0;
      const prev = this.index - 1;
      const index = Math.max(min, prev);
      if (index < this.index) {
        setTimeout(() => {
          console.log("decrement animation end");
          this.animation = "";
          this.index = index;
        }, duration);
        this.animation = "decrement";
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
      const duration = "1s";
      const timing = "ease-in-out";
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
      li#prev-preload, li#next-preload {
        flex: 0;
        opacity: 0.0;
        transform: scale(0.0);
      }

      @media (pointer: fine) { /* mouse */
        li#prev, li#next {
          opacity: 0.5;
          transform: scale(0.5);
          cursor: pointer;
        }

        @keyframes decrement {
          from { left: 0; }
          to { left: 1%; }
        }
        @keyframes increment {
          from { right: 0; }
          to { right: 1%; }
        }

        @keyframes scaleUp {
          0% {
            transform: scale(0.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.0);
            opacity: 1.0;
          }
        }
        @keyframes scaleDown {
          0% {
            transform: scale(1.0);
            opacity: 1.0;
          }
          100% {
            transform: scale(0.5);
            opacity: 0.5;
          }
        }
        @keyframes scaleOut {
          0% {
            flex: 1;
            transform: scale(0.5);
            opacity: 0.5;
          }
          100% {
            flex: 0;
            transform: scale(0.0);
            opacity: 0.0;
          }
        }
        @keyframes scaleIn {
          0% {
            flex: 0;
            transform: scale(0.0);
            opacity: 0.0;
          }
          100% {
            flex: 1;
            transform: scale(0.5);
            opacity: 0.5;
          }
        }

        ol#list.decrement {
          animation-timing-function: ${timing};
          animation-name: decrement;
          animation-duration: ${duration};
        }
        ol#list.decrement li#prev-preload {
          animation-timing-function: ${timing};
          animation-name: scaleIn;
          animation-duration: ${duration};
        }
        ol#list.decrement li#prev {
          animation-timing-function: ${timing};
          animation-name: scaleUp;
          animation-duration: ${duration};
        }
        ol#list.decrement li#current {
          animation-timing-function: ${timing};
          animation-name: scaleDown;
          animation-duration: ${duration};
        }
        ol#list.decrement li#next {
          animation-timing-function: ${timing};
          animation-name: scaleOut;
          animation-duration: ${duration};
        }

        ol#list.increment {
          animation-timing-function: ${timing};
          animation-name: increment;
          animation-duration: ${duration};
        }
        ol#list.increment li#prev {
          animation-timing-function: ${timing};
          animation-name: scaleOut;
          animation-duration: ${duration};
        }
        ol#list.increment li#current {
          animation-timing-function: ${timing};
          animation-name: scaleDown;
          animation-duration: ${duration};
        }
        ol#list.increment li#next {
          animation-timing-function: ${timing};
          animation-name: scaleUp;
          animation-duration: ${duration};
        }
        ol#list.increment li#next-preload {
          animation-timing-function: ${timing};
          animation-name: scaleIn;
          animation-duration: ${duration};
        }
      }

      @media (hover: none) and (pointer: coarse) { /* touch */
        li#prev {
          display: none;
        }
        li#next {
          display: none;
        }
      }
      </style>
      `;
    }
    renderList() {
      return `
      <ol id="list" class="${this.animation}">
      ${this.renderImage("prev-preload", this.images[this.index - 2])}
        ${this.renderImage("prev", this.images[this.index - 1])}
        ${this.renderImage("current", this.images[this.index])}
        ${this.renderImage("next", this.images[this.index + 1])}
        ${this.renderImage("next-preload", this.images[this.index + 2])}
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
        ${this.renderStyles()}
        ${this.renderList()}
      `;
    }
  }
);
