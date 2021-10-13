customElements.define(
  'wc-photo-gallery',
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
        <li class="previous">
          <img src="https://placekitten.com/500/500" />
        </li>
        <li class="current">
          <img src="https://placekitten.com/500/501" />
        </li>
        <li class="next">
          <img src="https://placekitten.com/500/502" />
        </li>
        <li>
          <img src="https://placekitten.com/500/503" />
        </li>
      </ol>`;
    }
  },
);
