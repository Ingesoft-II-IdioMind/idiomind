"use client";

import styles from "./Navbar.module.scss";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import { useState } from "react";


export default function Navbar () {
  const [menuOpen, setMenuOpen] = useState(false);
    return (
      <nav className = {styles.navbar}>
        <Link href="/" className= {styles.navbar__logo}>
          <img src="/appLogo.svg" alt="IdioMind logo" />
          <h5>IdioMind</h5>
        
        </Link>
        <div className={styles.navbar__mobile} onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className={styles.navbar__mobile__icon}/>
        </div>
        <ul className={menuOpen ? styles.navbar__itemsActive : styles.navbar__items} onClick={menuOpen ? () => setMenuOpen(!menuOpen) : undefined}>
            <li><Link href="/" className={styles.navbar__link}>Home</Link></li>
            <li><Link href="/aboutUs" className={styles.navbar__link}>About</Link></li>
            <li><Link href="/blog" className={styles.navbar__link}>Blog</Link></li>
            <li><Link href="/pricing" className={styles.navbar__link}>Pricing</Link></li>
            <li><Link href="/auth/login" className={`${styles.navbar__link} ${styles.navbar__link__log}`}>Log in</Link></li>
            <li><Link href="/auth/register" className={`${styles.navbar__link} ${styles.navbar__link__sign}`}>Sign up</Link></li>
        </ul>       
      </nav>
    );
  }




