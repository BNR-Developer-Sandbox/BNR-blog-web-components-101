import "./photo-gallery-item.js";
import "./button.js";

const template = document.createElement("template");
template.innerHTML = `
        <style id="style">
        #container {
          display: flex;
          flex-direction: row;
          flex: 1;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        @media (hover: none) and (pointer: coarse) { /* touch */
          #prev {
            display: none;
          }
          #next {
            display: none;
          }
        }
        #photos {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        #photos::slotted(*) {
          display: none;
        }
        #photos::slotted(:nth-child(1)) {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        </style>
        <div id="container" >
          <wc-button id="prev">👈</wc-button>
          <slot id="photos"></slot>
          <wc-button id="next">👉</wc-button>
        </div>
      `;

customElements.define(
  "wc-photo-gallery",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.touchStartX = null;

      this.addEventListener("click", this.onclick);
      this.addEventListener("touchstart", this.ontouchstart);
      this.addEventListener("touchend", this.ontouchend);
      this.addEventListener("keydown", this.onkeydown);

      if (!this.hasAttribute("index")) {
        this.index = 1;
      }
    }

    static get observedAttributes() {
      return ["index"];
    }

    set index(int) {
      this.setAttribute("index", int.toString());
    }
    get index() {
      return parseInt(this.getAttribute("index"), 10);
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === "index") {
        const style = this.shadowRoot.getElementById("style");
        const styleRule = [...style.sheet.cssRules].find(
          (item) => item.selectorText && item.selectorText.includes("nth")
        );
        styleRule.selectorText = styleRule.selectorText.replace(
          `:nth-child(${oldVal})`,
          `:nth-child(${newVal})`
        );
      }
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
      const { clientX } = event.changedTouches[0];
      this.touchStartX = clientX;
    }
    ontouchend(event) {
      const { clientX } = event.changedTouches[0];
      if (this.touchStartX < clientX) {
        this.decrement();
      } else {
        this.increment();
      }
      this.touchStartX = null;
    }

    onkeydown(event) {
      console.log(event.code);
      if (event.code === "ArrowLeft") {
        this.decrement();
      }
      if (event.code === "ArrowRight") {
        this.increment();
      }
    }

    increment() {
      const photos = this.shadowRoot.getElementById("photos");
      const max = photos.assignedElements().length;
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
      const min = 1;
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

    fetchNext() {
      console.log("photo-gallery.js: fetchNext() - override to implement");
    }
  }
);
