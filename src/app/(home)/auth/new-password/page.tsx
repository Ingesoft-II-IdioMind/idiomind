import { NewPasswordForm } from "app/components/home/auth/NewPasswordForm";
import styles from "../../../../components/home/auth/Auth.module.scss";

const NewPasswordPage = () => {
  return <div className={styles.auth}>
    <NewPasswordForm />
    </div>;
};

export default NewPasswordPage;