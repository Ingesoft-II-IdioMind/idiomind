import styles from "./Auth.module.scss";

export const FormDivider = () => {
    return (
        <div className={styles.auth__form__divider}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2"
          viewBox="0 0 185 2"
          fill="none"
        >
          <path
            d="M1.5 1H184"
            stroke="#E67320"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        or
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2"
          viewBox="0 0 185 2"
          fill="none"
        >
          <path
            d="M1.5 1H184"
            stroke="#E67320"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  };