import Image from "next/image";
import styles from "../styles/notFound.module.scss"

export default function NotFound() {
  return (
      <div className={styles.notFound}>
        <div className={styles.notFound__image}>
          <Image
          src="/images/errorImage.svg"
          alt="404 page not found"
          fill={true}
        />
        </div>
        <h1>Error 404: Page not found</h1>
      </div>
  );
}
