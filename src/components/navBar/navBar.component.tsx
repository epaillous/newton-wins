import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse, DropdownItem, DropdownMenu,
  DropdownToggle, Nav, Navbar, NavbarBrand,
  NavbarToggler, NavItem,
  UncontrolledDropdown
} from 'reactstrap';
import SearchBarComponent from '../../containers/searchBar.container';
import { MenuItem } from '../../models/menuItem';
import './navBar.component.css';

interface Props {
  menuItems: MenuItem[];
  collapsed: boolean;
  username: string;
  userPicture: string;
  signedIn: boolean;

  fetchMenu(): void;

  logout(): void;

  toggleNavBar(): void;
}

const AuthStatusComponent = (props: Props) => {
  const logout = () => props.logout();
  if (props.signedIn) {
    return (
      <div className="d-flex">
        <UncontrolledDropdown className="d-none d-md-flex">
          <DropdownToggle nav={true} className="account-info">
            <span>Bienvenue {props.username} !</span>
            {props.userPicture && <img src={props.userPicture} className="img-responsive"/>}
          </DropdownToggle>
          <DropdownMenu right={true}>
            <DropdownItem>
              Mon profil
            </DropdownItem>
            <DropdownItem divider={true}/>
            <DropdownItem onClick={logout}>
              Se déconnecter
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem className="d-sm-flex d-md-none">
          <a onClick={logout} className="nav-link nav-link-item">Se déconnecter</a>
        </NavItem>
      </div>
    );
  } else {
    return (
      <NavItem>
        <Link to="/login" className="nav-link nav-link-item">Se connecter</Link>
      </NavItem>
    );
  }
};

class NavBarComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  public componentWillMount() {
    this.props.fetchMenu();
  }

  public render() {
    return (
      <Navbar color="faded" light={true} expand="md" className="main-navbar">
        <NavbarBrand href="/">Le tour du monde de Ludo et Emilie</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
        <Collapse isOpen={!this.props.collapsed} navbar={true}>
          <Nav className="ml-auto right-nav" navbar={true}>
            <NavItem>
              <SearchBarComponent/>
            </NavItem>
            <AuthStatusComponent {...this.props}/>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  private toggleNavbar() {
    this.props.toggleNavBar();
  }

}

export default NavBarComponent;
