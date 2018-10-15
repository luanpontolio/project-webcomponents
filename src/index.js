import MyApp from './my-app';
import ListView from './list-view';
import DetailView from './detail-view';
import '../assets/style.css';

(function(){
	customElements.define('list-view', ListView);
	customElements.define('detail-view', DetailView);
	customElements.define('my-app', MyApp);
}());
