"use client";

import Image from "next/image";
import { Button } from "app/components/shared/Button";
import styles from "../Auth.module.scss";
import { TextField } from "app/components/shared/TextField";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "app/schemas";
import { useTransition } from "react";

import { useState } from "react";
import { FormDivider } from "../FormDivider";
import { FormError } from "../FormError";
import { useLoginMutation } from "app/redux/features/authApiSlice";
import { FormSuccess } from "../FormSuccess";
import { useAppDispatch } from "app/redux/hooks";
import { setAuth } from "app/redux/features/authSlice";
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader } from "app/components/shared/Loader";
import { toast } from "react-toastify";
import { continueWithGoogle } from "app/utils";
import { login } from "../../../../../actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../../routes";
import { signIn } from "../../../../../auth";
import { Social } from "../social";
import { formToJSON } from "axios";

import DOMPurify from 'dompurify';

type FormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  ? "Email already in use with different provider!"
  :"";

  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl");
  
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormInputs>();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      }
    })


  const onSubmit: SubmitHandler<FormInputs> = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    console.log("Pre-Sanitization: ");
    console.log(values);
    
    // Sanitize the input values
    const sanitizedValues = {
      email: DOMPurify.sanitize(values.email),
      password: DOMPurify.sanitize(values.password),
    };

    console.log("Post-Sanitization: ");
    console.log(sanitizedValues);

    startTransition(() => {
      login(sanitizedValues, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            reset();
          }
  
          if (data?.success) {
            setSuccess(data.success);
            reset();
          }
  
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
    

  return (
    <div className={styles.auth__form}>
      <div className={styles.auth__form__logo}>
        <img src="/appLogo.svg" alt="IdioMind logo" />
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      {showTwoFactor && (
        <TextField label="Two Factor Code">
        <input
          type="code"
          disabled={isPending}
          id="code" {...register("code")}
          placeholder="12345"
        />
      </TextField>
      )}
      {!showTwoFactor && (
        <>
        <TextField label="E-mail">
          <input
            type="email"
            disabled={isPending}
            id="email" {...register("email")}
            placeholder="user@email.com"
          />
        </TextField>
        {errors.email && (
          <span className={styles.errorInput}>{errors.email.message}</span>
        )}
        <TextField label="Password">
          <input
            disabled={isPending}
            type={visiblePassword ? "text" : "password"}
            id="password" {...register("password")}
            placeholder="******"
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
        <p className={styles.auth__form__resetPassword}>
          Did you forget your password?{" "}
          <Link href={"/auth/password-reset"}>Reset password here</Link>
        </p>
        </>)}
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending}> {isPending ? <Loader color="white"/> : showTwoFactor ? "Confirm" : "Login"}</Button>
        {/* {showTwoFactor && (<Button onClick={() => setShowTwoFactor(false)} disabled={isPending}> {isPending ? <Loader color="white"/> : "Cancel"}</Button>)} */}
        </form>
        {!showTwoFactor && ( <><p className={styles.auth__form__register}>
          You dont have an account?{" "}
          <Link href={"/auth/register"}>Register here</Link>
        </p>
      
      <FormDivider />
      <Social />
      </>)}
      {/* <Button
        haveIcon={true}
        Icon={() => (
          <Image
            src="/icons/googleColor.svg"
            alt="Google icon"
            width={25}
            height={25}
          />
        )}
        onClick={() => onClick("google")}
      >
      Log in with Google 
    </Button> */}
      <div></div>
    </div>
  );
}
