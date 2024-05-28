"use client";

import { Button } from "app/components/shared/Button";
import Image from 'next/image';
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {

  useEffect(() => {
    console.log(error)
  }, [])

  return (
    <div style={{
      padding: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <Image
          src="/images/errorImage.svg"
          alt="404 page not found"
          width={200}
          height={200}
        />
      <h1>:c Ha ocurrido un error</h1>
      <Button onClick={reset}>Cargar de nuevo</Button>
    </div>
  )
}