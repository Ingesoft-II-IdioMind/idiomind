import React, { useCallback } from "react";
// import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { PdfViewer, NormalizedTextSelection } from "react-pdf-selection";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer2: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleTextSelection = useCallback(
    (selection?: NormalizedTextSelection) => {
      if (selection) {
        console.log(`Selected text: ${selection.text}`);
      }
    },
    []
  );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <PdfViewer
        url={pdfUrl}
        onTextSelection={handleTextSelection}
      />
      {/* <Viewer
        fileUrl={pdfUrl}
        plugins={[defaultLayoutPluginInstance]}
      /> */}
    </div>
  );
};
