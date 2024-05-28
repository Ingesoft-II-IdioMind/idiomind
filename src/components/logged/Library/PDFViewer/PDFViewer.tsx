import styles from "./PDFViewer.module.scss";

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  DocumentLoadEvent,
  PdfJs,
  Position,
  PrimaryButton,
  Tooltip,
  Viewer,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
  HighlightArea,
  highlightPlugin,
  MessageIcon,
  RenderHighlightContentProps,
  RenderHighlightTargetProps,
  RenderHighlightsProps,
} from "@react-pdf-viewer/highlight";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { pdfjs } from "react-pdf";
import { NotesSidebar } from "./NotesSidebar";
import { TranslateSidebar } from "./TranslateSideBar";
import { useTranslatebar, useSidebar } from "./SideBarProvider";
import { set } from "zod";
import { useBringNotesMutation, useCreateNoteMutation, useDeleteNoteMutation } from "app/redux/features/noteApiSlice";
import { toast } from "react-toastify";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  fileUrl: string;
  idDoc: string;
}
export interface Note {
  id: number;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, idDoc }) => {
  const [message, setMessage] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [translateWord, setTranslateWord] = React.useState("");
  let noteId = notes.length;
  const { setIsTranslatebarOpen } = useTranslatebar();
  const { setIsSidebarOpen } = useSidebar();
  const [bringNotes2, { isLoading: isLoading }] = useBringNotesMutation();
  const [createNote2 , { isLoading: isLoading2 }] = useCreateNoteMutation();
  const [deleteNote2 , { isLoading: isLoading3 }] = useDeleteNoteMutation();
  const [isClicked, setIsClicked] = useState(false);

  const noteEles: Map<number, HTMLElement> = new Map();

  const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(
    null
  );

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsTranslatebarOpen(false);
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    bringNotes2(undefined)
      .unwrap()
      .then((response) => {
        // console.log(response);
        const mappedResponse = response
        .filter((item: { documento: any; }) => item.documento == idDoc)
        .map((item: { id: any; cita:any ;contenido: any; highlight_areas: any; }) => {
          return {
            id: item.id,
            content: item.contenido,
            highlightAreas: item.highlight_areas,
            quote: item.cita,
          };
        });

      setNotes([...notes, ...mappedResponse]);
      })
      .catch((e: { data: { detail: any } }) => {
        toast.error(e.data.detail || "There was an error while loading notes");
      });
  };

  const createNote = (note:Note) => {
    createNote2({documento:idDoc, contenido:note.content,cita: note.quote,highlight_areas:note.highlightAreas})
      .unwrap()
      .then((response) => {
        // console.log(response);
        note.id = response.id;
        setNotes(notes.concat([note]));
        setIsSidebarOpen(true);
      })
      .catch((e: { data: { detail: any } }) => {
        toast.error(e.data.detail || "There was an error while loading notes");
      });
  };

  const deleteNote = (noteId: number) => {
    deleteNote2({id: noteId})
      .unwrap()
      .then(() => {
        toast.success("Note deleted successfully");
        setNotes(notes.filter((item) => item.id !== noteId));
      })
      .catch((e) => {
        toast.error(e.data.detail || "There was an error while loading notes");
      });
  }

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    setCurrentDoc(e.doc);
    if (currentDoc && currentDoc !== e.doc) {
      // User opens new document
      setNotes([]);
    }
  };

  const renderHighlightTarget = (props: RenderHighlightTargetProps) => {
    const onClickTranslate = () => {
      setIsClicked(true);
      props.selectionRegion.width = 10;
      // console.log(props.selectedText);
      // console.log(props.highlightAreas)
      // console.log(props);
      setTranslateWord(props.selectedText);
      props.cancel();
      setIsTranslatebarOpen(true);
    };

    return (
      <div
        style={{
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        }}
        className={styles.optionsText}
      >
        <Tooltip
          position={Position.TopCenter}
          target={
            <Button onClick={props.toggle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
              </svg>
            </Button>
          }
          content={() => <div style={{ width: "100px" }}>Add note</div>}
          offset={{ left: 0, top: -8 }}
        />
        <Tooltip
          position={Position.TopCenter}
          target={
            <Button onClick={onClickTranslate}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" />
              </svg>
            </Button>
          }
          content={() => <div style={{ width: "100px" }}>Translate</div>}
          offset={{ left: 0, top: -8 }}
        />
      </div>
    );
  };

  const renderHighlightContent = (props: RenderHighlightContentProps) => {
    const addNote = () => {
      if (message !== null) {
        const note: Note = {
          id: ++noteId,
          content: message,
          highlightAreas: props.highlightAreas,
          quote: props.selectedText,
        };
        createNote(note);
        props.cancel();
        
      }
    };

    return (
      <div
        style={{
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        }}
        className={styles.writeNote}
      >
        <div>
          <textarea
            rows={3}
            style={{
              border: "1px solid rgba(0, 0, 0, .3)",
            }}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <PrimaryButton onClick={addNote}>Add</PrimaryButton>
          </div>
          <Button onClick={props.cancel}>Cancel</Button>
        </div>
      </div>
    );
  };

  const jumpToNote = (note: Note) => {
    const noteEle = noteEles.get(note.id);
    if (noteEle) {
      noteEle.scrollIntoView();
    }
  };

  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  { background: "orange", opacity: 0.4, borderRadius: "2px" },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => jumpToNote(note)}
                ref={(ref): void => {
                  noteEles.set(note.id, ref as HTMLElement);
                }}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights,
  });

  const { jumpToHighlightArea } = highlightPluginInstance;

  React.useEffect(() => {
    return () => {
      noteEles.clear();
    };
  }, []);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) =>
      defaultTabs.concat({
        icon: <MessageIcon />,
        title: "Notes",
        content: <></>,
      }),
  });

  const { activateTab } = defaultLayoutPluginInstance;

  return (
    <>
      <NotesSidebar jumpToHighlightArea={jumpToHighlightArea} notes={notes} deleteNote={deleteNote}/>
      <TranslateSidebar translateWord={translateWord} isClicked={isClicked} setIsClicked={setIsClicked}/>
      <div className={styles.floatingNotes} onClick={() => setIsSidebarOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"/></svg></div>
      <div style={{ height: "90vh", width: "80%", alignSelf: "center" }}>
        <Viewer
          fileUrl={fileUrl}
          plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}
          onDocumentLoad={handleDocumentLoad}
        />
      </div>
    </>
  );
};
