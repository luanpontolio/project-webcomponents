import { filmsURL } from './api/service';

class ListViewElement extends HTMLElement{
  connectedCallback() {
    let response = fetch(`${filmsURL}?&format=json`);
    response.then(data => data.json())
            .then(data => this.renderItems(data.results))
            .catch(error => this.showError());
  }

  renderItems(items) {
    this.innerHTML = items.reduce((a, item, i) => a + `
      <a href="/films/${i + 1}">
        <div>${item.title}</div>
      </a>`, '');
  }

  showError() {
    this.innerHTML = `
      <p class="error">No network connection</p>
    `;
  }

}

customElements.define('list-view', ListViewElement);