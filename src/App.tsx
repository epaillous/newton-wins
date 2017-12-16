import * as React from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <Navbar color="faded" light expand="md">
              <NavbarBrand href="/">Newton Wins</NavbarBrand>
          </Navbar>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
