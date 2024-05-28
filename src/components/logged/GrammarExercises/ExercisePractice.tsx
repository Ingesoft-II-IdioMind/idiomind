"use client";

import { Loader } from "app/components/shared/Loader";
import { useCreateExerciseMutation } from "app/redux/features/grammarApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Grammar.module.scss";
import { Button } from "app/components/shared/Button";

const ExercisePractice = ({
  language,
  topic,
}: {
  language: string;
  topic: string;
}) => {
  const [createExercise, { isLoading: isLoading2 }] =
    useCreateExerciseMutation();
  const [exercise, setExercise] = useState("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [checked, setChecked] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    fetchExercise();
  }, []);

  const fetchExercise = () => {
    setChecked(false);
    setSelectedAnswer("");
    setExplanation("");
    createExercise({
      issue: topic,
      idiom: language,
    })
      .unwrap()
      .then((response) => {
        console.log(response);
        setExercise(response[0]);
        const randomIndex = Math.floor(Math.random() * response[1].length);
        const newOptions = [...response[1]];
        newOptions.splice(randomIndex, 0, response[2]);
        setAnswerOptions(newOptions);
        setCorrectAnswer(response[2]);
        setExplanation(response[3]);
      })
      .catch((e: { data: { detail: any } }) => {
        toast.error(
          e.data.detail ||
            "There was an error while  generating the exercise, please try again"
        );
      });
  };

  const checkAnswer = () => {
    if (selectedAnswer == correctAnswer) {
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer");
    }
    setChecked(true);
  };

  return (
    <div className={styles.exercise}>
      {isLoading2 ? (
        <>
        <div className={styles.exercise__question}>Generating exercise</div>
        <Loader color="orange"></Loader>
        </>
      ) : (
        <>
          <div className={styles.exercise__question}>{exercise}</div>
          <div className={styles.exercise__answerOptions}>
            {answerOptions.map((answer: string) =>
              !checked ? (
                <button
                  className={
                    selectedAnswer == answer
                      ? `${styles.exercise__singleOption} ${styles.exercise__selected}`
                      : `${styles.exercise__singleOption}  ${styles.exercise__notSelected}`
                  }
                  onClick={() => setSelectedAnswer(answer)}
                >
                  {answer}
                </button>
              ) : (
                <button
                  className={
                    answer == correctAnswer
                      ? `${styles.exercise__singleOption} ${styles.exercise__correctAnswer}`
                      : answer == selectedAnswer
                      ? `${styles.exercise__singleOption}  ${styles.exercise__wrongAnswer}`
                      : `${styles.exercise__singleOption}  ${styles.exercise__notSelected}`
                  }
                  disabled
                >
                  {answer}
                </button>
              )
            )}
          </div>
            {checked && (
                <div className={styles.exercise__explanation}>
                    <strong>Explanation:</strong>
                {explanation}
                </div>
            )}
          <div className={styles.exercise__check}>
            {selectedAnswer == "" || checked ? (
              <></>
            ) : (
              <Button onClick={checkAnswer}>Check answer</Button>
            )}
            <Button onClick={fetchExercise}>New exercise</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExercisePractice;
