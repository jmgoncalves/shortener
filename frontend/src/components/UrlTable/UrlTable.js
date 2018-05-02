import React, { Component } from 'react';
import './UrlTable.css';

class UrlTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyList: props.keyList
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ keyList: nextProps.keyList })
  }

  render() {
    return (
      <div>
        <table>
          <thead><tr><th>Short URL</th><th>Long URL</th></tr></thead>
          <tbody>
            {this.state.keyList.map((k) => <UrlRow urlKey={k} key={k} api={this.props.api}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

class UrlRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: ""
    }

    props.api.getUrl(props.urlKey, (url) => this.setState({ longUrl: url }));
  }

  render() {
    return (
      <tr>
        <td><a href={'/l/'+this.props.urlKey}>{this.props.urlKey}</a></td>
        <td><a href={this.state.longUrl}>{this.state.longUrl}</a></td>
      </tr>
    );
  }
}

export default UrlTable;
