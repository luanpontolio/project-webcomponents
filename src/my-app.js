class MyAppElement extends HTMLElement {
  connectedCallback() {
  	// adiciona evento de click que observara o click nos items d pagina
    this.addEventListener('click', this.clickHandler);

  	this.updateVisiblePage();
  }

  updateVisiblePage(){
  	if(window.location.pathname.match(/^detail/)){
  		this.loadElement('detail-view');
  		document.body.classList.add('detail-view-active');
  		this.querySelector('detail-view').setAttribute('path', window.location.pathname);
  	} else {
  		this.loadElement('list-view');
  		document.body.classList.remove('detail-view-active');
  	}
  }

  // recebe o evento de click 
  // que contempla o elemento que foi clicado
  clickHandler(event) {
  	// Como esta sendo adicionado o evento click em toda a pagina 
  	// criamos uma validação onde verificamos se o evento de click veio
  	// de um click no botão, de um metaKey, ou ctrlKey, assim forcamos um retorna da função
  	if(event.button != 0 || event.metaKey  || event.ctrlKey) 
  		return;

  	// event.target captura o item click
  	let elements = event.target

  	// enquanto o item clicado for diferente do escopo da pagina
  	while(element != this){
  		// se ele for uma tag 'A' realizaremos o event.preventDefault();
  		// adicionaremos o seu link no historico do navegador
  		// e chamaremos o método updteVisiblePage;
  		if (element.tagName === 'A'){
  			event.preventDefault();
  			window.history.pushState(null, '', element.href);
  			this.updateVisiblePage();
  			return;
  		}
  		element = element.parentNode;
  	}
  }

  constructor(){
    super();
    this.loadElements = {};
  }

  loadElement(element){
  	if (this.loadElements[element])
  		return;

  	loadElement[element] = element;
  }
}

customElements.define('my-app', MyAppElement);
