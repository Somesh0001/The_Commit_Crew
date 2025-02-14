'use client';

import React from 'react';
import Image from 'next/image';
// import { useTranslations } from 'next-intl';

type NavbarProps = {
  logoSrc: string;
  logoAlt: string;
  link1: string;
  link2: string;
  link3: string;
  link4: string;
  link5: string;
  action1: string;
  action2: string;
};

const Navbar: React.FC<NavbarProps> = ({
  logoSrc,
  logoAlt,
  link1,
  link2,
  link3,
  link4,
  link5,
  action1,
  action2,
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-navbar-interactive">
        <Image alt={logoAlt} src={logoSrc} width={120} height={48} className="navbar-image1" />
        <nav className="navbar-links1">
          <span className="thq-link thq-body-small">{link1}</span>
          <span className="thq-link thq-body-small">{link2}</span>
          <span className="thq-link thq-body-small">{link3}</span>
          <span className="thq-link thq-body-small">{link4}</span>
          <span className="thq-link thq-body-small">{link5}</span>
        </nav>
        <div className="navbar-buttons1">
          <button className="navbar-action11 thq-button-animated thq-button-filled">
            <span className="thq-body-small">{action1}</span>
          </button>
          <button className="navbar-action21 thq-button-outline thq-button-animated">
            <span className="thq-body-small">{action2}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

Navbar.defaultProps = {
  link1: 'Home',
  link2: 'Features',
  link3: 'Solutions',
  link4: 'Pricing',
  link5: 'Contact',
  action1: 'Login',
  action2: 'Sign Up',
  logoSrc: 'https://example.com/logo.png',
  logoAlt: 'Company Logo',
};

export default Navbar;
