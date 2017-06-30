import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/master.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'jquery';
import 'dragula';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
