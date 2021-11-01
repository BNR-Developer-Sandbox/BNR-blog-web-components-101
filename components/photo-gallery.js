customElements.define(
  "wc-photo-gallery",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
      return ["images", "current"];
    }
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

    get current() {
      const attribute = this.getAttribute("current");
      return parseInt(attribute);
    }

    set current(int) {
      console.log("int", int);
      this.setAttribute("current", int.toString());
    }

    async connectedCallback() {
      console.log("connectedCallback", this.images);
      this.render();
    }
    disconnectedCallback() {}
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
      <ol id="list">
        ${this.images
          .map((image, index) => {
            console.log(
              "image",
              image,
              "index",
              index,
              "this.current",
              this.current
            );
            let className = "";
            let handler = null;
            if (this.current === index) {
              className = "current";
            } else if (this.current - 1 === index) {
              className = "previous";
            } else if (this.current + 1 === index) {
              className = "next";
            } else {
              className = "";
            }
            return `
          <li class="${className}">
            <img src="${image}" data-index="${index}" />
          </li>`;
          })
          .join("")}
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
      this.shadowRoot.getElementById("list").addEventListener(
        "click",
        (e) => {
          this.current = e.target.getAttribute("data-index");
        },
        true
      );
    }
  }
);
