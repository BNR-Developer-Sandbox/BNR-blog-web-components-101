import "./photo-gallery-item.js";
import "./button.js";

const template = document.createElement("template");
template.innerHTML = `
<style id="style">
:host {
  width: 100%;
}
:host(:focus-within) {
  outline: 0;
  box-shadow: 0 0 80px 20px rgba(80, 90, 240, 0.7);
  border: 1px solid rgba(120, 80, 240, 0.9);
}
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
  touch-action: pan-x pan-y;
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
<div id="container">
  <slot name="prev-button" id="prev"><wc-button>&#8678;</wc-button></slot>
  <slot id="photos"></slot>
  <slot name="next-button" id="next"><wc-button>&#8680;</wc-button></slot>
</div>
`;

customElements.define(
  "wc-photo-gallery",
  class extends HTMLElement {
    constructor() {
      super();

      this.touchStartX = null;

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      if (!this.hasAttribute("index")) {
        this.index = 1;
      }

      this.addEventListener("click", this.onclick);
      this.addEventListener("touchstart", this.ontouchstart);
      this.addEventListener("touchend", this.ontouchend);
      this.addEventListener("keydown", this.onkeydown);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.onclick);
      this.removeEventListener("touchstart", this.ontouchstart);
      this.removeEventListener("touchend", this.ontouchend);
      this.removeEventListener("keydown", this.onkeydown);
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
          (item) =>
            item.selectorText &&
            item.selectorText.includes("#photos::slotted(:nth-child(")
        );
        styleRule.selectorText = styleRule.selectorText.replace(
          `#photos::slotted(:nth-child(${oldVal})`,
          `#photos::slotted(:nth-child(${newVal})`
        );
      }
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
        this.dispatchEvent(new CustomEvent("change"));
      }
      if (next >= max) {
        this.dispatchEvent(new CustomEvent("next"));
      }
    }
    decrement() {
      const min = 1;
      const prev = this.index - 1;
      const index = Math.max(min, prev);
      if (index < this.index) {
        this.index = index;
        this.dispatchEvent(new CustomEvent("change"));
      }
      if (prev <= min) {
        this.dispatchEvent(new CustomEvent("prev"));
      }
    }
  }
);
