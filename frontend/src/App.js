import React, { Component } from 'react';
import './App.css';
import UrlTable from './components/UrlTable/UrlTable'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyList: [],
      newUrl: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateNewUrl = this.updateNewUrl.bind(this);
    this.handleNewUrlResponse = this.handleNewUrlResponse.bind(this);
    this.updateList = this.updateList.bind(this);
  }


  componentWillMount() {
    this.updateList()
  }

  updateNewUrl(event) {
    this.setState({newUrl: event.target.value});
  }

  updateList() {
    this.props.api.getAll((keys) => {
      this.setState({keyList: keys});
    });
  }

  handleSubmit(event) {
    this.props.api.createUrl(this.state.newUrl, this.handleNewUrlResponse);
  }

  handleNewUrlResponse(newUrlKey) {
    this.updateList();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shortener by jmgoncalves</h1>
        </header>
        <p>
          <input type="text" value={this.state.newUrl} onChange={this.updateNewUrl}/>
          <input type="submit" value="Create Short URL" onClick={this.handleSubmit}/>
        </p>
        <UrlTable keyList={this.state.keyList} api={this.props.api} />
      </div>
    );
  }
}

export default App;
