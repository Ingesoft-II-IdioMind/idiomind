import styles from "./Document.module.scss";
import Image from "next/image";

interface DocumentProps {
  title: string;
  imageUrl: string;
  onClick: () => void;
}

export const Document: React.FC<DocumentProps> = ({ title, imageUrl, onClick }) => {
  return (
    <div onClick={onClick} className={styles.documentContainer}>
      <div className={styles.documentImage}>
        <Image src={imageUrl} alt="DocumentCover" layout="fill" />
        <div className={styles.gradientOverlay}></div>
      </div>
      <div className={styles.documentTitleContainer}>
        <h5 className={styles.documentTitle}>{title}</h5>
      </div>
    </div>
  );
};