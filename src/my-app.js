class MyAppElement extends HTMLElement {
  connectedCallback() {
    // adiciona evento de click que observara o click nos items d pagina
    this.addEventListener('click', this.clickHandler);
    // adiciona o evento popstate para observar os eventos de navegação do browser
    window.addEventListener('popstate', this.updateVisiblePage.bind(this));
    // adiciona função para carregar no load do componente para verificar a rota que estamos
    this.updateVisiblePage();
  }

  updateVisiblePage(){
    if(window.location.pathname.match('^/films')) {
      document.body.classList.add('detail-view-active');
      this.querySelector('detail-view').setAttribute('path', window.location.pathname);
    } else {
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
    let element = event.target

    // enquanto o item clicado for diferente do escopo da pagina
    while(element !== this){
      // se ele for uma tag 'A' realizaremos o event.preventDefault(); cancelando a 
      // o evento mas não sua propagação.
      // adicionaremos o seu link no historico do navegador
      // e chamaremos o método updteVisiblePage;
      if (element.tagName === 'A'){
        event.preventDefault();
        // pushState recebe 3 paramentros:
        // 1 - Objeto de estado: é um objeto que é associado nova entrada no historico 
        // criado por pushState. Sempre que usuário navegar para novo estado é disparado o evento `popstate`
        // 2 - Titulo, que será ignorado
        // 3 - URL para qual será encaminhada
        console.log(element);
        window.history.pushState(null, '', element.href);
        this.updateVisiblePage();
        return;
      }
      element = element.parentNode;
    }
  }

  constructor(){
    super();
  }
}

customElements.define('my-app', MyAppElement);
