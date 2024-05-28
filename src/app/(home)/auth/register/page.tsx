import { RegisterForm } from "app/components/home/auth/Register";
import { RegisterImage } from "app/components/home/auth/Register/RegisterImage/RegisterImage";
import styles from "../../../../components/home/auth/Auth.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Register',
	description: 'register page',
};

export default function Register() {
    return (
      <div className={styles.auth}>
        <RegisterImage />
        <RegisterForm />
      </div>
    );
  }
  