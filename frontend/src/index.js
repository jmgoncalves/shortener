import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import API from './API.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App api={API} />, document.getElementById('root'));
registerServiceWorker();
