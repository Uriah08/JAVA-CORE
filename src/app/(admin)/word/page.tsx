"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  ImageRun,
  WidthType,
} from "docx";
import { renderAsync } from "docx-preview";

const DOCXPreview = () => {
  const [docURL, setDocURL] = useState<string | null>(null);

  const generateDocx = async () => {
    try {
      console.log("Generating DOCX...");

      const response = await fetch("/logo.png");
      const imageArrayBuffer = await response.arrayBuffer();
      const imageBuffer = new Uint8Array(imageArrayBuffer);

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            width: { size: 20, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new ImageRun({
                                    data: imageBuffer,
                                    transformation: { width: 80, height: 80 },
                                    type: "png"
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: { size: 80, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "JAVA ",
                                    bold: true,
                                    color: "FF0000",
                                    font: "Arial",
                                  }),
                                  new TextRun({
                                    text: "Condition Monitoring Pty Ltd",
                                    bold: true,
                                    font: "Arial",
                                  }),
                                ],
                              }),
                              new Paragraph({ text: "ABN: XX XXX" }),
                              new Paragraph({ text: "XXXXX NSW 9000" }),
                              new Paragraph({ text: "XXXX XXX XXX" }),
                              new Paragraph({ text: "ryan.java@xxxxxxxxxxx.com.au" }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const arrayBuffer = await blob.arrayBuffer();
      setDocURL(URL.createObjectURL(blob));
      const previewContainer = document.getElementById("doc-preview");

      if (previewContainer) {
        previewContainer.innerHTML = "";
        await renderAsync(arrayBuffer, previewContainer);
      }
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  return (
    <div className="h-screen w-full">
      <Button onClick={generateDocx} className="bg-main hover:bg-follow">
        Preview DOCX
      </Button>

      {/* Render the DOCX Preview */}
      <div id="doc-preview" className="border mt-4 p-4 bg-white"></div>
    </div>
  );
};

export default DOCXPreview;
