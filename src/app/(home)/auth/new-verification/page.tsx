import { NewVerificationForm } from "app/components/home/auth/NewVerificationForm";
import styles from "../../../../components/home/auth/Auth.module.scss";

const NewVerificationPage = () => {
  return <div className={styles.auth}><NewVerificationForm /></div>;
};

export default NewVerificationPage;