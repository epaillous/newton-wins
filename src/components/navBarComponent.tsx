import * as React from 'react';
import './navBarComponent.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';
import { MenuItem } from '../models/menuItem';


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
        <NavbarToggler onClick={() => this.toggleNavbar()}/>
        <Collapse isOpen={!this.props.collapsed} navbar>
          <Nav className="ml-auto" navbar={true}>
            {
              this.props.menuItems.map(item => (
                <NavItem key={item.name}>
                  <NavLink className="menu-item" href="#"
                           onClick={() => this.props.selectMenuItem(item)}>{item.name}</NavLink>
                </NavItem>
              ))
            }
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBarComponent;