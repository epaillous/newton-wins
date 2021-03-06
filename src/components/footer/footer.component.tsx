import * as React from 'react';
import { Link } from 'react-router-dom';
import './footer.component.css';

// tslint:disable-next-line:max-line-length
const path = 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9, 16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z';

export class FooterComponent extends React.Component {

  public render() {
    return (
      <footer className="main-footer">
        <div className="main-title">
          <span>Made with</span>
          <svg className="heart" viewBox="0 0 32 29.6">
            <path d={path}/>
          </svg>
          <span>by Emilie et Ludovic</span>
        </div>
        <Link to="/mentions" className="mentions d-none d-md-block">Remerciements</Link>
      </footer>
    );
  }
}
