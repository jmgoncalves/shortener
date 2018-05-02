import React from 'react';
import ReactDOM from 'react-dom';
import UrlTable from './UrlTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UrlTable keyList={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
