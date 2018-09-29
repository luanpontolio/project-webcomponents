import { baseURL } from './api/service';

class DetailViewElement extends HTMLElement{
  // método para observar as alteração no atributo path do nosso
  // elemento detail-view
  static get observedAttributes() {
    return ['path'];
  }

  attributeChangedCallback(attr, oldValue, newValue){
    if(attr !== 'path' || !newValue)
      return;

    this.innerHTML = '';
    let response = fetch(`${baseURL}${newValue}?format=json`)
    response.then(data => data.json())
        .then(data => this.renderItems(newValue, data))
        .catch(error => this.showError());
  }

  renderItems(id = '', item){
    this.innerHTML = `
      <img src="../images${id}.jpg">
      <a href="/" class="close-btn">&times;</a>
      <article>
        <h1>${item.title}</h1>
        <section>
          <p>${item.opening_crawl}</p>
        </section>
      </article>
    `
  }

  showError(){
    this.innerHTML = `
      <a href="/" class="close-btn">&times;</a>
      <p class="error">No network connection</p>
    `;
  }
}

customElements.define('detail-view', DetailViewElement);