import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './containers/app/App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker' 


    import { Provider } from 'react-redux'
    import { BrowserRouter as Router, Route } from 'react-router-dom'
    import { setupAxios } from './api/setup-axios'
    import { configureStore } from './redux/configure-store' 


    setupAxios() 


    const store = configureStore() 

;

ReactDOM.render(
  <Provider store={store}>
<Router>
<Route path="/" component={App} />
</Router>
</Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
