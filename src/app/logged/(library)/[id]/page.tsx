"use client";

import { NavDocument } from "app/components/shared/NavDocument";
import { useBringOneDocumentMutation } from "app/redux/features/docApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  HighlightArea,
  MessageIcon,
  RenderHighlightTargetProps,
  highlightPlugin,
} from "@react-pdf-viewer/highlight";
import { PDFViewer } from "app/components/logged/Library/PDFViewer/PDFViewer";
import { DocumentObject } from "../page";
import { Loader } from "app/components/shared/Loader";

export default function PageBook({ params }: { params: { id: string } }) {
  const [bringOneDocument2, { isLoading }] = useBringOneDocumentMutation();
  const [document, setDocument] = useState<DocumentObject>();
  const [documentId, setDocumentId] = useState("");
  const [documentLink, setDocumentLink] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentAutor, setDocumentAutor] = useState("");

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = () => {
    bringOneDocument2({ id: params.id })
      .unwrap()
      .then((response) => {
        // console.log(response);
        setDocument(response);
        setDocumentId(response.id);
        setDocumentLink(response.archivo_url);
        setDocumentTitle(response.titulo);
        setDocumentAutor(response.autor);
        // console.log(document?.titulo);
      })
      .catch((e) => {
        toast.error(
            "There was an error while loading the documents, please try again"
        );
      });
  };

  const fileUrl = "https://idiomind-frontend.vercel.app/docExample/cuestionario.pdf";
  // const fileUrl = "https://http://klocalhost:3000//docExample/cuestionario.pdf";

  return (
    <>
      <NavDocument name={documentTitle} id={documentId} autor={documentAutor}/>
      {isLoading ? (
          <Loader color="orange"></Loader>
      ) : (
        // <PDFViewer fileUrl={fileUrl} idDoc={params.id}/>
        <PDFViewer fileUrl={documentLink} idDoc={params.id} />
      )}
    </>
  );
}
