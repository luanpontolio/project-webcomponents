import { filmsURL } from './api/service';

class DetailViewElement extends HTMLElement{
  connectedCallback() {
  }

  constructor(){
    super();

  }
}

customElements.define('detail-view', DetailViewElement);