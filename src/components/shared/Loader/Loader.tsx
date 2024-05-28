import styles from "./Loader.module.scss";

export const Loader = ({ color }: { color: string }) => {
  return (
    <div className={styles.bigContainer}>
    <div className={`${styles.lds_ellipsis} ${color == 'white'? styles.loaderWhite : styles.loaderOrange}`} ><div></div><div></div><div></div><div></div></div></div>
  );
};
