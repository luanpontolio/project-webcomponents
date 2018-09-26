import { filmsURL } from './api/service';

class ListViewElement extends HTMLElement{
  connectedCallback() {
    const response = fetch(`${filmsURL}?format=json`);
    const films    = response.then(data => data.json())
                             .then(data => this.renderItems(data.results));
  }

  renderItems(items) {
    this.innerHTML = items.reduce((a, item) => a + `
      <a href="###">
        <div>${item.title}</div>
      </a>`, '');
  }

}

customElements.define('list-view', ListViewElement);