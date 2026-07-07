import type { ReactNode } from 'react';
import './Nav.scss';

const Nav = (props: { children?: ReactNode }) => {
  return (
    <header className="nav-header">
      <h1 className="nav-heading">
        <img width="40" src="/site-scan.png" alt="SiteScan Icon" />
        <a href="/check" target="_self">
          SiteScan
        </a>
      </h1>
      {props.children && props.children}
    </header>
  );
};

export default Nav;
