import * as React from 'react';
import './navBar.component.css';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { MenuItem } from '../../models/menuItem';
import SearchBarComponent from '../../containers/searchBar.container';
import { DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';

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
          {this.props.signedIn ?
            <div className="signed-in-nav">
              <UncontrolledDropdown>
                <DropdownToggle nav className="account-info">
                  <span>Bienvenue {this.props.username} !</span>
                  {this.props.userPicture &&
                  <img src={this.props.userPicture} className="img-responsive"/>
                  }
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Mon profil
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem onClick={() => this.props.logout()}>
                    Se déconnecter
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div> :
            <div className="signed-in-nav">
              <div className="account-info">
                <Link to="/login" className="connect-link">Se connecter</Link>
              </div>
            </div>
          }
        </Nav>
      </Navbar>
    );
  }
}

export default NavBarComponent;
