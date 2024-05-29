"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "app/schemas";

import { reset } from "../../../../actions/reset";
import { Button } from "app/components/shared/Button";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import { TextField } from "app/components/shared/TextField";
import styles from "./Auth.module.scss";
import { Loader } from "app/components/shared/Loader";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className={styles.auth__form}>
      <div className={styles.auth__form__logo}>
        <img src="/appLogo.svg" alt="IdioMind logo" />
        <h2>Reset password</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="E-mail">
          <input
            type="email"
            disabled={isPending}
            id="email"
            {...register("email")}
            placeholder="user@email.com"
          />
        </TextField>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
        {isPending ? <Loader color="white"/> : "Send reset email"}
          
        </Button>
      </form>
      <div></div>
    </div>
  );
};
