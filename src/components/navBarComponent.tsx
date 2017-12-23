import * as React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { MenuItem } from '../models/menuItem';

interface Props {
  menuItems: MenuItem[];

  fetchMenu(): void;

  selectMenuItem(item: MenuItem): void;
}

class NavBarComponent extends React.Component<Props> {

  componentWillMount() {
    this.props.fetchMenu();
  }

  render() {
    return (
      <Navbar color="faded" light={true} expand="md">
        <NavbarBrand href="/">Le tour du monde de Ludo & Emilie</NavbarBrand>
        <Nav className="ml-auto" navbar={true}>
          {
            this.props.menuItems.map(item => (
              <NavItem key={item.name}>
                <NavLink href="#" onClick={() => this.props.selectMenuItem(item)}>{item.name}</NavLink>
              </NavItem>
            ))
          }
        </Nav>
      </Navbar>
    );
  }
}

export default NavBarComponent;