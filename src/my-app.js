class MyAppElement extends HTMLElement {
  connectedCallback() {
      
  }

  constructor(){
    super();
    this.elements = {};
  }
}

customElements.define('my-app', MyAppElement);
