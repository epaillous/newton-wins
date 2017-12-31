import * as React from 'react';
import './navBarComponent.css';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { MenuItem } from '../models/menuItem';
import SearchBarComponent from './../containers/searchBarContainer';

interface Props {
  menuItems: MenuItem[];
  collapsed: boolean;

  fetchMenu(): void;

  selectMenuItem(item: MenuItem): void;

  toggleNavbar(): void;
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
        <NavbarBrand href="/">Le tour du monde de Ludo & Emilie</NavbarBrand>
        <Nav className="ml-auto" navbar={true}>
          <SearchBarComponent/>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBarComponent;