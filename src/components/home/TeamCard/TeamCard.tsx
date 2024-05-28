import React from 'react';
import Image from "next/image";
import styles from "./TeamCard.module.scss";

export default function TeamCard(props: any) {
  return (
    <div className={styles.teamCard}>
      <Image
        src={props.fotoLink}
        alt="foto of team member"
        width={208}
        height={208}
        className={styles.teamCard__foto}
      />
      <h5>{props.name}</h5>
      <p>{props.rol}</p>
      <div className={styles.teamCard__social}>
        <a href={props.githubLink}>
          <Image
            src="/icons/gitHub.svg"
            alt="github link"
            width={45}
            height={45}
          />
        </a>
        <a href={props.linkedinLink}>
          <Image
            src="/icons/linkedin.svg"
            alt="linkedin link"
            width={45}
            height={45}
          />
        </a>
        <a href={props.mailLink}>
          <Image
            src="/icons/google.svg"
            alt="gmail link"
            width={45}
            height={45}
          />
        </a>
      </div>
    </div>
  );
}
