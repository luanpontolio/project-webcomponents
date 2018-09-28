import { filmsURL } from './api/service';

class ListViewElement extends HTMLElement{
  connectedCallback() {
    const response = fetch(`${filmsURL}?format=json`);
    const films    = response.then(data => data.json())
                             .then(data => this.renderItems(data.results))
                             .catch(error => this.showError());
  }

  renderItems(items) {
    this.innerHTML = items.reduce((a, item, i) => a + `
      <a href="detail/${i + 1}">
        <img src="/images/films/${i + 1}.jpg">
        <div>${item.title}</div>
      </a>`, '');
  }

  showError() {
    this.innerHTML = `
      <a href="/" class="close-btn">&times;</a>
      <p class="error">No network connection</p>
    `;
  }

}

customElements.define('list-view', ListViewElement);