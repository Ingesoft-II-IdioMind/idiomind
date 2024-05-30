"use client";

import { Button } from "app/components/shared/Button";
import { signIn } from "next-auth/react";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
    <Button
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
    </Button>
    <Button
    haveIcon={true}
    Icon={() => (
      <Image
        src="/icons/gitHub2.svg"
        alt="Github icon"
        width={25}
        height={25}
      />
    )}
    onClick={() => onClick("github")}
  >
    Log in with Github
  </Button>
  </>
  );
};
