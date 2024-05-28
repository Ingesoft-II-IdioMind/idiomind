"use client";

import Image from "next/image";
import { TextField } from "app/components/shared/TextField";
import styles from "./ContactUs.module.scss";
import { Button } from "app/components/shared/Button";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  password: string;
  message:string;
};

export default function ContactUsForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <div className={styles.contact}>
      <div className={styles.contact__image}>
        <Image
          src="images/contactUsImage.svg"
          alt="Contact us image"
          fill={true}
        />
      </div>
      <form className={styles.contact__form}>
      <TextField label="Name">
          <input
            type="name"
            {...register("name", {
              required: {
                value: true,
                message: "*name is required",
              },
            })}
            placeholder="User name"
          />
        </TextField>
        <TextField label="E-mail">
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
            placeholder="user@email.com"
          />
        </TextField>
        <TextField label="Subject">
          <input
            type="subject"
            {...register("subject", {
              required: {
                value: true,
                message: "*Subject is required",
              },
            })}
            placeholder="..."
          />
        </TextField>
        <TextField label="Message">
          <input
            type="message"
            {...register("message", {
              required: {
                value: true,
                message: "*Message is required",
              },
            })}
            placeholder="..."
            height={200}
          />
        </TextField>
        <Button type="submit">Send message</Button>
      </form>
    </div>
  );
}
