import LoginForm from "app/components/home/auth/Login/LoginForm";
import { LoginImage } from "app/components/home/auth/Login/LoginImage";
import styles from "../../../../components/home/auth/Auth.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Login',
	description: 'login page',
};

export default function Login() {
  return (
    <div className={styles.auth}>
      <LoginImage />
      <LoginForm />
    </div>
  );
}
