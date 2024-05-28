"use client";

import Link from "next/link";
import styles from "./Grammar.module.scss";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, useState } from "react";

interface ComponentProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const GrammarLenguage: React.FC<ComponentProps> = ({ language, setLanguage }) => {

  const [optionsOpen, setOptionsOpen] = useState(false);

  const lenguages = [
    { name: "English" },
    { name: "German" },
    { name: "French" },
    { name: "Italian" },
  ];


  function getLanguageStyle(language: string) {
    return language == "German" ? styles.german : language == "French" ? styles.french : language == "Italian" ? styles.italian: styles.english;
  }

  return (
    <div className={styles.grammarLenguageContainer}>
      <div className={getLanguageStyle(language)}>
        <LogoLenguage lenguage={language} />
        <h3>{language}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id={styles.optionsIcon}
          className={optionsOpen ? styles.iconActive : styles.iconInnactive}
          onClick={() => setOptionsOpen(!optionsOpen)}
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
        <ul className={styles.languageOptions}>
          {optionsOpen &&
            lenguages.filter((lenguage) => lenguage.name !== language).map((lenguage, index) => (
              <li key={index} onClick={() => {setLanguage(lenguage.name); setOptionsOpen(false)}} className={getLanguageStyle(lenguage.name)}>
                <p>{lenguage.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

const LogoLenguage = ({ lenguage }: { lenguage: string | undefined }) => {
  return (
    <svg
      width="126"
      height="84"
      viewBox="0 0 126 84"
      fill="none"
      className={styles.logo}
      id={lenguage}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="LogoGrammar" clipPath="url(#clip0_666_1376)">
        <path
          id="leftEyeLogo"
          d="M48.9588 27.981H48.9573C45.0901 27.981 41.9551 31.1125 41.9551 34.9754V48.9675C41.9551 52.8304 45.0901 55.962 48.9573 55.962H48.9588C52.8261 55.962 55.9611 52.8304 55.9611 48.9675V34.9754C55.9611 31.1125 52.8261 27.981 48.9588 27.981Z"
          fill="#353739"
        />
        <path
          id="rigthEyeLogo"
          d="M76.9693 27.981C80.8347 27.981 83.9715 31.1158 83.9715 34.9754V48.9659C83.9715 52.8272 80.8332 55.9604 76.9693 55.9604C73.1038 55.9604 69.967 52.8256 69.967 48.9659V34.9754C69.967 31.1142 73.1053 27.981 76.9693 27.981Z"
          fill="#353739"
        />
        <path
          id={styles.upperLogo}
          d="M125.279 5.04773L114.556 17.9025C112.894 19.8939 111.983 22.4054 111.983 24.9986V57.6395C111.983 64.4385 106.465 69.951 99.658 69.951H98.0496V49.0245C101.918 49.0245 105.053 45.8928 105.053 42.0285C105.053 38.1642 101.918 35.034 98.0496 35.034V26.3605C98.0496 19.5615 92.5325 14.049 85.7244 14.049H27.9487V12.3115C27.9487 5.51249 33.4673 0 40.2739 0H122.912C125.524 0 126.952 3.04403 125.279 5.04773Z"
        />
        <path
          id={styles.underLogo}
          d="M98.0498 69.951V71.6884C98.0498 78.489 92.5327 84 85.7246 84H3.08758C0.474645 84 -0.951992 80.9575 0.719607 78.9522L11.444 66.099C13.1064 64.1061 14.0154 61.5961 14.0154 59.0029V26.3605C14.0154 19.5614 19.534 14.049 26.3405 14.049H27.9489V34.9755C24.0804 34.9755 20.9452 38.1072 20.9452 41.9715C20.9452 45.8358 24.0804 48.966 27.9489 48.966V57.6394C27.9489 64.4385 33.4675 69.951 40.2741 69.951H98.0498Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_666_1376">
          <rect width="126" height="84" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
