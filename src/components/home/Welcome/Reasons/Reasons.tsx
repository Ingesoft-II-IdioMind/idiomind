import styles from "../Welcome.module.scss";
import Image from "next/image";

export const Reasons = () => {
  return (
    <>
      <h1>Why choose IdioMind</h1>
      <div className={styles.reasons}>
        <div className={styles.reasons__block}>
          <div>
            Learn with the best tools designed to give you an inmersive
            experience
          </div>
          <div>Choose and practice with your favorite topics and documents</div>
        </div>
        <div className={styles.reasons__block}>
          <div>Learn new vocabulary in a fast and effective way</div>
          <Image
            src={"/images/bookReasons.svg"}
            alt={"Illustracion libro"}
            width={150}
            height={150}
          />
          <div>You can lead your own learning proccess and </div>
        </div>
        <div className={styles.reasons__block}>
          <div>
            A user-friendly interface design for making learning funnier
          </div>
          <div>Learn new vocabulary in a fast and effective way</div>
        </div>
      </div>
    </>
  );
};
