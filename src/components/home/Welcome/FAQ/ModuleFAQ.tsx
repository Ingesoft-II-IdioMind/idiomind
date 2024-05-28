import { FAQ } from "./FAQ";
import styles from "./FAQ.module.scss";

export const ModuleFAQ = () => {
  return (
    <>
      <h1>Frequently asked questions</h1>
      <div className={styles.divfaq}>
        <FAQ
          question={
            "What languages are available for learning in the application?"
          }
          answer={
            "The application offers a wide range of languages for learning, including but not limited to English, Spanish, French, German and Italian."
          }
        />
        <FAQ
          question={"Is the application suitable for beginners?"}
          answer={
            "Yes, absolutely! The application is designed to cater to learners of all levels, from beginners to advanced. It offers a variety of learning materials and exercises suitable for each proficiency level."
          }
        />
        <FAQ
          question={"What are the main tools that IdioMind gives to users?"}
          answer={
            "With IdioMind you have access to different tools to inmerse yourself in lenguage learning like real time traslation, phonetic practices and grammar exercises."
          }
        />
        <FAQ
          question={"Is there a mobile app available for the application?"}
          answer={
            "No, currently, there is no mobile app available for the application but it is possible that in the future we develop one to improve our users experience."
          }
        />
        <FAQ
          question={
            "Is there customer support available if I encounter any issues?"
          }
          answer={
            "Yes, our customer support team is available to assist you with any questions or issues you may encounter while using the application. You can reach out to us via email or through the in-app support feature."
          }
        />
      </div>
    </>
  );
};
