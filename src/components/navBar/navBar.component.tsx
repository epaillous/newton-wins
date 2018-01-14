import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownItem, DropdownMenu, DropdownToggle,
  Nav, Navbar, NavbarBrand, UncontrolledDropdown,
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

  goToLogin(): void;
}

const AuthStatusComponent = (props: Props) => {
  const logout = () => props.logout();
  if (props.signedIn) {
    return (
      <div className="right-nav">
        <UncontrolledDropdown>
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
      </div>
    );
  } else {
    return (
      <div className="right-nav">
        <div className="account-info">
          <Link to="/login" className="connect-link" onClick={props.goToLogin}>Se connecter</Link>
        </div>
      </div>
    );
  }
};

class NavBarComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
  }

  public componentWillMount() {
    this.props.fetchMenu();
  }

  public render() {
    return (
      <Navbar color="faded" light={true} expand="md" className="main-navbar">
        <NavbarBrand href="/">Le tour du monde de Ludo et Emilie</NavbarBrand>
        <Nav className="ml-auto right-nav" navbar={true}>
          <SearchBarComponent/>
          <AuthStatusComponent {...this.props}/>
        </Nav>
      </Navbar>
    );
  }

  private goToLogin() {
    this.props.goToLogin();
  }
}

export default NavBarComponent;
