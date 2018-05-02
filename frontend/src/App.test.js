import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const dummyApi = {
    getAll: function(callback) {},
    getUrl: function(key, callback) {},
    createUrl: function(url, callback) {}
  }

  const div = document.createElement('div');
  ReactDOM.render(<App api={dummyApi} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
