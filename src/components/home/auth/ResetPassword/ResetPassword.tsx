"use client";

import { Button } from "app/components/shared/Button";
import styles from "../Auth.module.scss";
import { TextField } from "app/components/shared/TextField";
import { useForm } from "react-hook-form";
import { useState} from "react";
import { useResetPasswordMutation } from "app/redux/features/authApiSlice";
import { FormSuccess } from "../FormSuccess";
import { Loader } from "app/components/shared/Loader";
import { FormError } from "../FormError";

type FormInputs = {
  email: string;
  password: string;
};

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [resetPassword2, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  //const router = useRouter()

  const onSubmit = handleSubmit((data) => {
    resetPassword2(data.email)
    .unwrap()
    .then(() => {
      setError(undefined);
      setSuccess('Request sent, check your email for reset link');
    })
    .catch(() => {
      setSuccess(undefined);
      setError('Failed to sent request');
    });
  });

  return (
    <div className={styles.auth__form}>
      <div className={styles.auth__form__logo}>
        <img src="/appLogo.svg" alt="IdioMind logo" />
        <h2>Reset password</h2>
      </div>
      <form onSubmit={onSubmit}>
        <TextField label="E-mail">
          <input
            type="email"
            disabled={isLoading}
            {...register("email", {
              required: {
                value: true,
                message: "*Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "*Invalid email address",
              },
            })}
            placeholder="user@email.com"
          />
        </TextField>
        {errors.email && (
          <span className={styles.errorInput}>{errors.email.message}</span>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" >{isLoading ? <Loader color="white"/> : "Request password reset"}</Button>
      </form>
      <div></div>
    </div>
  );
}
