import Image from 'next/image'
import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className= {styles.footer__logo}>
          <img src="/logoBlanco.svg" alt="IdioMind logo" />
          <h6>© 2024 IdioMind. All rights reserved.</h6>
      </div>
      <ul className={styles.footer__networks}>
        <li><a href="https://www.facebook.com/profile.php?id=61556364793601&sk=about_details "> <Image src="/icons/facebookIcon.svg" alt="Facebook" width={32} height={32} /></a></li>
        <li><a href="https://www.tiktok.com/@idiomindapp?is_from_webapp=1&sender_device=pc"><Image src="/icons/tiktokIcon.svg" alt="Tiktok" width={32} height={32} /></a></li>
        <li><a href="https://www.twitter.com/@idiomindapp"><Image src="/icons/instagramIcon.svg" alt="Twitter" width={32} height={32} /></a></li>
      </ul>
      <ul className={styles.footer__items}>
        <li><Link href="/contactUs" className={styles.footer__link}>Contact us</Link></li>
        <li><Link href="/termsOfUse" className={styles.footer__link}>Terms of use</Link></li>
        <li><Link href="/privacyPolicy" className={styles.footer__link}>Privacy policy</Link></li>
      </ul>
    </footer>
  );
}