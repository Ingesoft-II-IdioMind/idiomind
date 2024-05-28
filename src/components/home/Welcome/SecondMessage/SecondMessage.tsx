import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Welcome.module.scss";

export const SecondMessage = () => {
    return (
    <div className={styles.secondMessage}>
      <h5>
        "As a language enthusiast, I find this language learning app to be
        incredibly beneficial. It provide a convenient and flexible way to
        learn at your own pace, anytime and anywhere with amazing tools that
        you can’t find in other places.”
      </h5>
      <h4 className={styles.secondMessage__author}>-Andrew Hoberman, user of IdioMind</h4>
    </div >
    );
  };
  