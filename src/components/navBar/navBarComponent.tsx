import * as React from 'react';
import './navBarComponent.css';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { MenuItem } from '../../models/menuItem';
import SearchBarComponent from '../../containers/searchBar.container';
import { Button } from 'reactstrap';

interface Props {
  menuItems: MenuItem[];
  collapsed: boolean;
  username: string;
  userPicture: string;
  signedIn: boolean;

  fetchMenu(): void;

  selectMenuItem(item: MenuItem): void;

  toggleNavbar(): void;

  logout(): void;
}

class NavBarComponent extends React.Component<Props> {

  componentWillMount() {
    this.props.fetchMenu();
  }

  toggleNavbar() {
    this.props.toggleNavbar();
  }

  render() {
    return (
      <Navbar color="faded" light={true} expand="md" className="main-navbar">
        <NavbarBrand href="/">Le tour du monde de Ludo et Emilie</NavbarBrand>
        <Nav className="ml-auto right-nav" navbar={true}>
          <SearchBarComponent/>
          {this.props.signedIn &&
          <div className="signed-in-nav">
            <div className="account-info">
              {this.props.userPicture &&
              <img src={this.props.userPicture} className="img-responsive"/>
              }
              <span>Bienvenue {this.props.username} !</span>
            </div>
            <Button onClick={() => this.props.logout()}>Se déconnecter</Button>
          </div>
          }
        </Nav>
      </Navbar>
    );
  }
}

export default NavBarComponent;
