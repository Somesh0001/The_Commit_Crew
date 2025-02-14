"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Navbar.module.css"; // Assuming CSS modules for styling

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={styles.navbar}>
      {/* Logo and Heading */}
      <div className={styles.logoContainer}>
        <Link href="/" passHref>
          <div className={styles.logoWrapper}>
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </div>
        </Link>
        <div className={styles.heading}>
          <div className={styles.mainHeading}>IEEE Student Branch</div>
          <div className={styles.subHeading}>NIT Jamshedpur</div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className={`${styles.menuLinks} ${showMenu ? styles.show : ""}`}>
        <ul>
          <li>
            <Link href="/" scroll={false}>
              About
            </Link>
          </li>
          <li>
            <Link href="/" scroll={false}>
              Events
            </Link>
          </li>
          <li>
            <Link href="/" scroll={false}>
              Branch Chapters
            </Link>
          </li>
          <li>
            <Link href="/" scroll={false}>
              Membership
            </Link>
          </li>
          <li>
            <Link href="/" scroll={false}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/" scroll={false}>
              Our Team
            </Link>
          </li>
          <li>
            <Link href="/admin" passHref>
              Admin
            </Link>
          </li>
        </ul>
      </div>

      {/* Hamburger Menu */}
      <div className={styles.hamburgerMenu}>
        <GiHamburgerMenu
          className={styles.hamburgerIcon}
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
