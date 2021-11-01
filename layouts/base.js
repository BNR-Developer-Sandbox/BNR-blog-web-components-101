import "/components/header.js";
import "/components/main.js";
import "/components/footer.js";

customElements.define(
  'wc-layouts-base',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `
      <style type="text/css">
      #container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100vh;
      }
      </style>
      <div id="container">
        <wc-header>
          <slot slot="title" name="title">
            Default Base Layout Header Title
          </slot>
        </wc-header>
        <wc-main>
          <slot slot="content" name="content">
            Default Base Layout Main Content
          </slot>
        </wc-main>
        <wc-footer></wc-footer>
      </div>
      `;
    }
  },
);
