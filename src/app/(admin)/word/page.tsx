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
  AlignmentType,
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
              properties: {
                  page: {
                      margin: {
                          top: 30 * 20,
                          bottom: 30 * 20,
                          left: 30 * 20,
                          right: 30 * 20,
                      },
                  },
              },
              children: [
                new Table({
                  borders: {
                      top: { style: "none", size: 0 },
                      bottom: { style: "none", size: 0 },
                      left: { style: "none", size: 0 },
                      right: { style: "none", size: 0 },
                  },
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
                                                    transformation: { width: 100, height: 100 },
                                                    type: "png",
                                                }),
                                            ],
                                            alignment: AlignmentType.LEFT,
                                        }),
                                    ],
                                    margins: { top: 100, bottom: 100, right: 400 },
                                }),
                                
                                new TableCell({
                                    width: { size: 80, type: WidthType.PERCENTAGE },
                                    children: [
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                          
                                            children: [
                                              new TextRun({
                                                text: "JAVA",
                                                bold: true,
                                                size: 24,
                                                color: "FF0000",
                                            }),
                                            new TextRun({
                                                text: " Condition Monitoring Pty Ltd",
                                                bold: true,
                                                size: 22,
                                            }),
                                            ],
                                        }),
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                            children: [
                                                new TextRun({
                                                    text: "ABN: XX XXX",
                                                    size: 20,
                                                }),
                                            ],
                                        }),
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                            children: [
                                                new TextRun({
                                                  text: "XXXXXX NSW 9000",
                                                  size: 20
                                                }),
                                            ],
                                        }),
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                            children: [
                                                new TextRun({
                                                  text: "XXXX XXX XXXX",
                                                  size: 20
                                                }),
                                            ],
                                        }),
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                            children: [
                                                new TextRun({
                                                    text: "ryan.java@xxxxxxxxxxx.com.au",
                                                    size: 20
                                                }),
                                            ],
                                        }),
                                    ],
                                    margins: { left: 100, top: 330 },
                                }),
                            ],
                        }),
                    ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 500 },
                  children: [
                    new TextRun({
                      text: "Vibration Analysis Report",
                      bold: true,
                      size: 30,
                    })
                  ]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 100 },
                  children: [
                    new TextRun({
                      text: "Pumps VA Report",
                      bold: true,
                      size: 20,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { before: 500, after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Client : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: " Client 1",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Plant Area : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: " All Area",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Report Number : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: " ABC123 – VA01",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Date Inspected : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: " 01 January 2024 ",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Date Reported : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: " 05 January 2024 ",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { before: 300, after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Job Number : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: " ABC123-1",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Purchase Order Number : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: " 12345",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Work Order Number : ",
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: "  678910 ",
                      size: 22,
                    })
                  ]
                }),
            ],
          },
          // {
          //     properties: {
          //         type: SectionType.NEXT_PAGE,
          //         page: {
          //             margin: {
          //                 top: 30 * 20,
          //                 bottom: 30 * 20,
          //                 left: 30 * 20,
          //                 right: 30 * 20,
          //             },
          //         },
          //     },
          //     children: [
          //         new Paragraph({
          //             children: [new TextRun("This is Page 2 with 30pt margins.")],
          //         }),
          //     ],
          // },
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
