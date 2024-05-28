// import { PasswordResetForm } from 'app/components/forms';
import { ResetPasswordForm } from 'app/components/home/auth/ResetPassword';
import type { Metadata } from 'next';
import styles from "../../../../components/home/auth/Auth.module.scss";

export const metadata: Metadata = {
	title: 'Password Reset',
	description: 'password reset page',
};

export default function ResetPasswordPage() {
	return (
		<div className={styles.auth}>
		<ResetPasswordForm />
	  </div>
	);
}
