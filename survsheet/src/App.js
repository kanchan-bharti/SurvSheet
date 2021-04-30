import React from 'react';
import Spreadsheet from './components/mySpreadsheet.js';
import LandingPage from './components/LandingPage.js';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.createnew = this.createnew.bind(this);
  }

  state = {
    renderView: 0
  }

  createnew(e) {
    this.setState({
      renderView: + e.target.value
    })
  }

  render() {
    switch (this.state.renderView) {
      case 1:
        return <Spreadsheet />;
      default:
        return <LandingPage createnew={this.createnew} />;
    }
  }
}

export default App;
