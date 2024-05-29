"use client";

import { Button } from "app/components/shared/Button";
import { Loader } from "app/components/shared/Loader";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import { newVerification } from "../../../../actions/new-verification";


export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <h3>Email verification</h3>
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <Loader color="orange" />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
      <Link href={"/auth/login"}><Button>Back to login</Button></Link>
    </div>
  )
}