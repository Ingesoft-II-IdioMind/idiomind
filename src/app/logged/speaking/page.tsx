"use client";

import styles from "../../../styles/Speaking.module.scss";
import { Button } from "app/components/shared/Button";
import { SpeakingWord } from "app/components/logged/Speaking/SpeakingWord/SpeakingWord";
import { useBringNotesMutation } from "app/redux/features/noteApiSlice";
import React, { useEffect } from "react";
import {
  HighlightArea,
} from "@react-pdf-viewer/highlight";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader } from "app/components/shared/Loader";

const shuffleIcon = () => (
  <svg
    width="74"
    height="67"
    viewBox="0 0 74 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M58.7266 2.25589C59.2553 1.7272 60.1124 1.7272 60.6411 2.25589L71.979 13.5938C72.5077 14.1225 72.5077 14.9796 71.979 15.5083L60.6411 26.8462C60.1124 27.3749 59.2553 27.3749 58.7266 26.8462C58.1979 26.3175 58.1979 25.4604 58.7266 24.9317L67.7534 15.9048L52.1233 15.9048C48.3279 15.8992 44.6341 17.1305 41.6012 19.4122C41.0038 19.8617 40.155 19.7417 39.7056 19.1442C39.2561 18.5467 39.376 17.698 39.9735 17.2485C43.4765 14.6132 47.7428 13.191 52.1264 13.1973L67.7535 13.1973L69.1072 14.551M71.0217 14.551V13.1973L67.7535 13.1973L58.7266 4.17042C58.1979 3.64174 58.1979 2.78457 58.7266 2.25589M1.64062 14.551C1.64062 13.8034 2.24673 13.1973 2.9944 13.1973H14.3323C19.703 13.1973 24.8537 15.3308 28.6514 19.1284C32.4491 22.9261 34.5826 28.0768 34.5826 33.4475C34.5826 38.1001 36.4308 42.5622 39.7207 45.8521C43.0106 49.142 47.4727 50.9902 52.1253 50.9902H67.7534L58.7266 41.9634C58.1979 41.4347 58.1979 40.5775 58.7266 40.0489C59.2553 39.5202 60.1124 39.5202 60.6411 40.0489L71.979 51.3867C72.5077 51.9154 72.5077 52.7726 71.979 53.3013L60.6411 64.6392C60.1124 65.1679 59.2553 65.1679 58.7266 64.6392C58.1979 64.1105 58.1979 63.2533 58.7266 62.7246L67.7534 53.6978H52.1253C46.7546 53.6978 41.6038 51.5643 37.8062 47.7666C34.0085 43.969 31.875 38.8182 31.875 33.4475C31.875 28.7949 30.0268 24.3329 26.7369 21.043C23.447 17.7531 18.9849 15.9048 14.3323 15.9048H2.9944C2.24673 15.9048 1.64062 15.2987 1.64062 14.551ZM26.7523 47.7513C27.2016 48.349 27.0813 49.1976 26.4836 49.6469C22.9798 52.2806 18.7141 53.7025 14.3308 53.6978H2.9944C2.24673 53.6978 1.64062 53.0917 1.64062 52.344C1.64062 51.5964 2.24673 50.9903 2.9944 50.9903H14.3337C18.1292 50.9943 21.8228 49.7631 24.8568 47.4826C25.4544 47.0333 26.3031 47.1537 26.7523 47.7513Z"
      fill="white"
    />
    <path
      d="M58.7266 2.25589C59.2553 1.7272 60.1124 1.7272 60.6411 2.25589L71.979 13.5938C72.5077 14.1225 72.5077 14.9796 71.979 15.5083L60.6411 26.8462C60.1124 27.3749 59.2553 27.3749 58.7266 26.8462C58.1979 26.3175 58.1979 25.4604 58.7266 24.9317L67.7534 15.9048L52.1233 15.9048C48.3279 15.8992 44.6341 17.1305 41.6012 19.4122C41.0038 19.8617 40.155 19.7417 39.7056 19.1442C39.2561 18.5467 39.376 17.698 39.9735 17.2485C43.4765 14.6132 47.7428 13.191 52.1264 13.1973M58.7266 2.25589L69.1072 14.551L67.7535 13.1973M58.7266 2.25589C58.1979 2.78457 58.1979 3.64174 58.7266 4.17042L67.7535 13.1973M58.7266 2.25589L71.0217 14.551V13.1973L67.7535 13.1973M52.1264 13.1973L52.1253 14.5511M52.1264 13.1973L67.7535 13.1973M14.3308 53.6978C18.7141 53.7025 22.9798 52.2806 26.4836 49.6469C27.0813 49.1976 27.2016 48.349 26.7523 47.7513C26.3031 47.1537 25.4544 47.0333 24.8568 47.4826C21.8228 49.7631 18.1292 50.9943 14.3337 50.9903H2.9944C2.24673 50.9903 1.64062 51.5964 1.64062 52.344C1.64062 53.0917 2.24673 53.6978 2.9944 53.6978H14.3308ZM14.3308 53.6978L14.3323 52.3446M2.9944 13.1973C2.24673 13.1973 1.64062 13.8034 1.64062 14.551C1.64062 15.2987 2.24673 15.9048 2.9944 15.9048H14.3323C18.9849 15.9048 23.447 17.7531 26.7369 21.043C30.0268 24.3329 31.875 28.7949 31.875 33.4475C31.875 38.8182 34.0085 43.969 37.8062 47.7666C41.6038 51.5643 46.7546 53.6978 52.1253 53.6978H67.7534L58.7266 62.7246C58.1979 63.2533 58.1979 64.1105 58.7266 64.6392C59.2553 65.1679 60.1124 65.1679 60.6411 64.6392L71.979 53.3013C72.5077 52.7726 72.5077 51.9154 71.979 51.3867L60.6411 40.0489C60.1124 39.5202 59.2553 39.5202 58.7266 40.0489C58.1979 40.5775 58.1979 41.4347 58.7266 41.9634L67.7534 50.9902H52.1253C47.4727 50.9902 43.0106 49.142 39.7207 45.8521C36.4308 42.5622 34.5826 38.1001 34.5826 33.4475C34.5826 28.0768 32.4491 22.9261 28.6514 19.1284C24.8537 15.3308 19.703 13.1973 14.3323 13.1973H2.9944Z"
      stroke="white"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export interface Note {
  id: number;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
}
export default function Speaking() {
  const [bringNotes2, { isLoading: isLoading }] = useBringNotesMutation();
  const [notes, setNotes] = React.useState<Note[]>([]);
  const router = useRouter();

  const randomContent = () => {
    if (notes.length > 0) {
      const randomIndex = Math.floor(Math.random() * notes.length);
      const randomNote = notes[randomIndex];
      router.push(`/logged/speaking/${randomNote.content}`);
    } else {
      toast.error("No notes available for selection");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    bringNotes2(undefined)
      .unwrap()
      .then((response) => {
      const mappedResponse = response
        .map((item: { id: any; cita:any; contenido: any; highlight_areas: any; }) => {
          return {
            content: item.cita,
          };
        });

      setNotes([...notes, ...mappedResponse]);
      })
      .catch((e: { data: { detail: any } }) => {
        toast.error(e.data.detail || "There was an error while loading unknown vocabulary.");
      });
  };

  return (
    <>
      <h1>Speaking</h1>
      <div className={styles.speakingButtons}>
        <Button
          haveIcon={true}
          isRound={true}
          Icon={shuffleIcon}
          onClick={randomContent}
        />
      </div>
      {isLoading ? (
            <Loader color="orange"></Loader>
          ) : (
        <div>
          {notes.map((note, index) => (
              <SpeakingWord
                key={index}
                content={note.content}
              />
            ))}
          
        </div>
      )}
    </>
  );
}



