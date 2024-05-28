"use client";

import { Button } from "app/components/shared/Button";
import styles from "../Auth.module.scss";
import { TextField } from "app/components/shared/TextField";
import Link from "next/link";
import Image from "next/image";
import { FormDivider } from "../FormDivider";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { useRegisterMutation } from "app/redux/features/authApiSlice";
import { Loader } from "app/components/shared/Loader";
import { continueWithGoogle } from "app/utils";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

type FormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_Password: string;
  terms: boolean;
};

export default function RegisterForm() {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [register2, { isLoading }] = useRegisterMutation();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const password = watch("password");
  const confirmPassword = watch("re_Password");

  const onSubmit = handleSubmit((data: any) => {
    if (data.last_name === "") {
      data.last_name = "none";
    }
    register2({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      re_password: data.re_Password,
    })
      .unwrap()
      .then(() => {
        setError(undefined);
        setSuccess("You have been registered successfully.");
        toast.success("You have been registered successfully.");
        router.push('/auth/login');
      })
      .catch((e) => {
        setSuccess(undefined);
        if (e.data && e.data.password) {
          setError(e.data.password.join(" "));
        } else if (e.data && e.data.email) {
          setError(e.data.email.join(" "));
        } else {
          setError(
            e.message ||
              "There was an error while registering, please try again"
          );
        }
      });
  });

  return (
    <div className={styles.auth__form}>
      <div className={styles.auth__form__logo}>
        <img src="/appLogo.svg" alt="IdioMind logo" />
        <h2>Sign up</h2>
      </div>
      <Button
        onClick={continueWithGoogle}
        haveIcon={true}
        Icon={() => (
          <Image
            src="/icons/googleColor.svg"
            alt="Google icon"
            width={30}
            height={30}
          />
        )}
      >
        Sign up with google
      </Button>
      <FormDivider />
      <form onSubmit={onSubmit}>
        <div className={styles.auth__form__names}>
          <TextField label="First name*">
            <input
              type="first_name"
              {...register("first_name", {
                required: {
                  value: true,
                  message: "*Name is required",
                },
              })}
              placeholder="Jack"
            />
          </TextField>
          <TextField label="Last name">
            <input
              type="last_name"
              {...register("last_name", {})}
              placeholder="Doe"
            />
          </TextField>
        </div>
        {errors.first_name && (
          <span className={styles.errorInput}>{errors.first_name.message}</span>
        )}
        <TextField label="E-mail*">
          <input
            type="email"
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
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="user@email.com"
          />
        </TextField>
        {errors.email && (
          <span className={styles.errorInput}>{errors.email.message}</span>
        )}
        <TextField label="Password*">
          <input
            type={visiblePassword ? "text" : "password"}
            {...register("password", {
              required: {
                value: true,
                message: "*Password is required",
              },
              minLength: {
                value: 8,
                message: "*Password must have at least 8 characters",
              },
              pattern: {
                value: /\d/,
                message: "*Password must contain at least one number",
              },
            })}
            placeholder="(At least 8 long and 1 number)"
          />
          {!visiblePassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
            </svg>
          )}
        </TextField>
        {errors.password && (
          <span className={styles.errorInput}>{errors.password.message}</span>
        )}
        <TextField label="Confirm password*">
          <input
            type={visiblePassword2 ? "text" : "password"}
            {...register("re_Password", {
              required: {
                value: true,
                message: "*Confirmation is required",
              },
              validate: (value) =>
                value === password || "*The passwords don't match",
            })}
            placeholder="******"
          />
          {!visiblePassword2 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={() => setVisiblePassword2(!visiblePassword2)}
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              onClick={() => setVisiblePassword2(!visiblePassword2)}
            >
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
            </svg>
          )}
        </TextField>
        {errors.re_Password && (
          <span className={styles.errorInput}>
            {errors.re_Password.message}
          </span>
        )}
        <label className={styles.auth__form__terms}>
          <input
            type="checkbox"
            {...register("terms", {
              required: {
                value: true,
                message:
                  "*You have to accept the terms and conditions to continue",
              },
            })}
          />
          <p>
            {" "}
            I confirm that I have read and accept our{" "}
            <Link href="/termsOfUse">Terms and conditions</Link> and{" "}
            <Link href="/privacyPolicy">Privacy Policy</Link>
          </p>
        </label>
        {errors.terms && (
          <span className={styles.errorInput}>{errors.terms.message}</span>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader color="white" /> : "Sign up"}
        </Button>
      </form>

      <p>
        You already have an account?{" "}
        <Link href={"/auth/login"}>Log in here</Link>
      </p>
    </div>
  );
}
