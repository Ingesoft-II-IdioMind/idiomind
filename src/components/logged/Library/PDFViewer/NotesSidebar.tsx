import { HighlightArea } from "@react-pdf-viewer/highlight";
import styles from "./PDFViewer.module.scss";
import { useSidebar } from "./SideBarProvider";
import { set } from "zod";

interface Note {
  id: number;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
}

interface NotesSidebarProps {
  jumpToHighlightArea: (highlightArea: HighlightArea) => void;
  notes: Note[];
  deleteNote: (id: number) => void;
}

export const NotesSidebar: React.FC<NotesSidebarProps> = ({
  notes,
  jumpToHighlightArea,
  deleteNote,
}) => {
  const { setIsSidebarOpen, isSidebarOpen } = useSidebar();

  if (!isSidebarOpen) {
    return null;
  }

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.notesSidebar}>
      <div className={styles.notesSidebar__titleContent}>
        <h5 className={styles.notesSidebar__title}>Notes</h5>
        <svg
          className={styles.notesSidebar__close}
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg>
      </div>

      <div className={styles.notesSidebar__notes}>
        {notes.length === 0 && (
          <div className={styles.notesSidebar__noNotes}>There are no notes</div>
        )}
        {notes.map((note) => {
          return (
            <div
              key={note.id}
              className={styles.notesSidebar__blockNote}
              onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
            >
              <div className={styles.notesSidebar__underlinedDiv}>
                <div className={styles.notesSidebar__underlinedDiv__icon}>
                  <svg
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteNote(note.id);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
                <blockquote className={styles.notesSidebar__underlined}>
                  {note.quote}
                </blockquote>
              </div>
              <b>Note: </b> {note.content}
            </div>
          );
        })}
      </div>
      <div className={styles.notesSidebar__divider}></div>
    </div>
  );
};
