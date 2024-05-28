"use client"

import React, { useState } from "react";
import styles from "./FAQ.module.scss";

export const FAQ = ({ question, answer }: { question: string; answer: string }) => {

  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className={styles.faq}>
      <button className={styles.faq__question} onClick={() => setAccordionOpen(!accordionOpen)}>
         <h5>{question}</h5>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={accordionOpen? styles.iconActive:styles.iconInnactive}>
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </button>
      <div className={accordionOpen? styles.faq__answer: styles.faq__answer__clossed}>
        <p>{answer}</p>
      </div>
    </div>
  );
};
