import "./photo.js";

customElements.define(
  "wc-photo-gallery",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      // this.loading = true;
      // this.index = 0;
      // this.images = [];
      // this._click = () => { console.log("photo-gallery.js.click"); };
      // this._prev = () => { console.log("photo-gallery.js.prev"); };
      // this._next = () => { console.log("photo-gallery.js.next"); };
    }

    static get observedAttributes() {
      return ["loading", "index", "images"];
    }

    set loading(bool) {
      this.setAttribute("loading", bool.toString());
    }
    get loading() {
      return this.getAttribute("loading") === "true";
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

    // set click(fn) {
    //   this._click = fn;
    // }
    // get click() {
    //   return this._click;
    // }
    // set prev(fn) {
    //   this._prev = fn;
    // }
    // get prev() {
    //   return this._prev;
    // }
    // set next(fn) {
    //   this._next = fn;
    // }
    // get next() {
    //   return this._next;
    // }

    async connectedCallback() {
      this.loading = true;

      await this.connected();

      // this.onclick = this.click;
      // this.addTouchEvents();

      // console.log("connectedCallback", this.index, this.images);

      this.render();
      this.renderImages();

      this.loading = false;
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      // console.log(this.loading);
      if (!this.loading) {
        // console.log("attrName", attrName, "oldVal", oldVal, "newVal", newVal);
        const shouldRenderImages = (
          (attrName === "index") ||
          (attrName === "images" && newVal.length > oldVal.length)
        );
        if (shouldRenderImages) {
          this.renderImages();
        }
      }
    }
    disconnectedCallback() {
      // TODO remove event listeners
    }

    // addTouchEvents() {
    //   let startTouchX = null;
    //   this.ontouchstart = (e) => (startTouchX = e.touches[0].clientX);
    //   this.ontouchend = (e) => {
    //     if (Math.abs(startTouchX - e.changedTouches[0].clientX) > 25) {
    //       if (startTouchX < e.changedTouches[0].clientX) {
    //         const isNearBeginning = true;
    //         if (isNearBeginning) {
    //           // this.prev(); // fetch and insert more images
    //         }
    //         this.index = this.index - 1;
    //       } else {
    //         const isNearEnd = true;
    //         if (isNearEnd) {
    //           // this.next(); // fetch and append more images
    //         }
    //         this.index = this.index + 1;
    //       }
    //     }
    //     startTouchX = null;
    //   };
    // }

    prev() {
      console.log("photo-gallery.js.prev - override to implement");
    }

    next () {
      console.log("photo-gallery.js.next - override to implement");
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
        ol {
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
          display: flex;
          flex: 1;
          max-width: 100vw;
        }
        </style>
        <ol id="list"></ol>
      `;
    }

    renderImages() {
      const list = this.shadowRoot.getElementById("list");
      list.innerHTML = "";
      // TODO get current index and use with slice
      // console.log(this.index, this.images);

      const prevIndex = this.index - 1;
      const prevLi = document.createElement("li");
      const canClickPrev = (prevIndex > 0);
      const shouldFetchPrev = !canClickPrev;
      if (shouldFetchPrev) {
        // fetch previous
        console.log("fetching prev", "prevIndex", prevIndex);
        this.prev();
      }
      if (canClickPrev) {
        prevLi.onclick = () => {
          this.index = prevIndex;
        };
      }
      const prev = document.createElement("wc-photo");
      prev.image = this.images[prevIndex];
      prevLi.appendChild(prev);
      list.appendChild(prevLi);

      const currentIndex = this.index;
      const currentLi = document.createElement("li");
      const current = document.createElement("wc-photo");
      current.image = this.images[currentIndex];
      currentLi.appendChild(current);
      list.appendChild(currentLi);

      const nextIndex = this.index + 1;
      const nextLi = document.createElement("li");
      const canClickNext = (nextIndex < this.images.length - 1);
      const shouldFetchNext = !canClickNext;
      if (shouldFetchNext) {
        // fetch next
        console.log("fetching next", "nextIndex", nextIndex);
        this.next();
      }
      if (canClickNext) {
        nextLi.onclick = () => {
          console.log("clicked next");
          this.index = nextIndex;
        }
      };
      const next = document.createElement("wc-photo");
      next.image = this.images[nextIndex];
      nextLi.appendChild(next);
      list.appendChild(nextLi);
    }
  }
);
