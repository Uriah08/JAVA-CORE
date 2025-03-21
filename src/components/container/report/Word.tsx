"use client";

import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  TextRun,
  ImageRun,
  WidthType,
  AlignmentType,
  UnderlineType,
  SectionType,
  ShadingType,
  Footer,
  PageNumber,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  TextWrappingType,
} from "docx";
import { Button } from "@/components/ui/button";
import {
  selectedJob,
  TransformedAnalysis,
  TransformedRecommendation,
  graphData,
  yAxisValues,
} from "@/schema";

import html2canvas from "html2canvas";

import CustomBarChart from "@/components/container/charts/ReportChart";
import React, { useRef } from "react";

const symbols = ["N", "M", "S", "C", "X"];

const fetchImages = async () => {
  try {
    const images = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await fetch(`/severity/${symbol}.png`);
        if (!response.ok) throw new Error(`Failed to load ${symbol}.png`);
        const arrayBuffer = await response.arrayBuffer();
        return { name: symbol, buffer: new Uint8Array(arrayBuffer) };
      })
    );

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

const DOCXDownload = ({
  data,
  graphData,
  yAxisValues,
  transformedRecommendationData,
  transformedAnalysisData,
  loading,
}: {
  data: selectedJob;
  graphData: graphData;
  yAxisValues: yAxisValues;
  transformedRecommendationData: TransformedRecommendation[];
  transformedAnalysisData: TransformedAnalysis[];
  loading: boolean;
}) => {
  const chartRef = useRef(null);
  const [docxLoading, setDocxLoading] = React.useState(false);
  const generateDocx = async () => {
    setDocxLoading(true);
    try {
      let imageDataBuffer = null;
      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current);
        const imageDataUrl = canvas.toDataURL("image/png");
        imageDataBuffer = await fetch(imageDataUrl).then((res) =>
          res.arrayBuffer()
        );
      }

      const logo = await fetch("/report/java(logo).png");
      const imageArrayBuffer = await logo.arrayBuffer();
      const logoBuffer = new Uint8Array(imageArrayBuffer);

      const images = await fetchImages();

      const groupedRecommendationData = transformedRecommendationData.reduce(
        (acc, item) => {
          if (!acc[item.equipmentGroup]) {
            acc[item.equipmentGroup] = [];
          }
          acc[item.equipmentGroup].push(item);
          return acc;
        },
        {} as Record<string, TransformedRecommendation[]>
      );

      // dynamic table of Recommendation
      const tableRows = Object.entries(groupedRecommendationData).flatMap(
        ([equipmentGroup, items]) => [
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 3,
                width: { size: 100, type: WidthType.PERCENTAGE },
                shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                margins: { left: 50, right: 20, top: 80, bottom: 80 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        font: "Arial",
                        text: equipmentGroup,
                        size: 20,
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          ...items.map(
            ({ equipmentAndComponent, priority, action, date }) =>
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 35, type: WidthType.PERCENTAGE },
                    margins: { left: 50, right: 20, top: 10, bottom: 10 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font: "Arial",
                            text: equipmentAndComponent,
                            size: 20,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    margins: { left: 50, right: 20, top: 10, bottom: 10 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            font: "Arial",
                            text: priority,
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    margins: { left: 50, right: 20, top: 10, bottom: 10 },
                    children: [
                      new Paragraph({
                        spacing: { after: 10, line: 220 },
                        children: [
                          new TextRun({
                            font: "Arial",
                            text: ` ${priority}: `,
                            size: 20,
                            bold: true,
                          }),
                          new TextRun({
                            font: "Arial",
                            text: action,
                            size: 20,
                          }),
                          new TextRun({
                            text: "\n",
                            break: 1,
                          }),
                          new TextRun({
                            text: "\n",
                            break: 1,
                          }),
                          new TextRun({
                            font: "Arial",
                            text: `Date: ${date}`,
                            size: 20,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              })
          ),
        ]
      );

      const groupedAnalysisData = transformedAnalysisData.reduce(
        (acc, machine) => {
          if (!acc[machine.equipmentGroup]) {
            acc[machine.equipmentGroup] = [];
          }
          acc[machine.equipmentGroup].push(machine);
          return acc;
        },
        {} as Record<string, TransformedAnalysis[]>
      );

      // dynamic table of Analysis
      const analysisTableRows = Object.entries(groupedAnalysisData).flatMap(
        ([equipmentGroup, machines]) => [
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 4,
                width: { size: 100, type: WidthType.PERCENTAGE },
                shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                margins: { left: 50, right: 20, top: 80, bottom: 80 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        font: "Arial",
                        text: equipmentGroup,
                        size: 20,
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          ...machines.map((machine) => {
            const recommendations = (machine.recommendations || []).map(
              (recommendation) =>
                new TextRun({
                  font: "Arial",
                  text: `${recommendation.priority}: ${recommendation.recommendation}`,
                  size: 20,
                })
            );

            if (recommendations.length > 0) {
              recommendations.push(
                new TextRun({
                  text: "\n",
                  break: 1,
                }),
                new TextRun({
                  text: "\n",
                  break: 1,
                }),
                new TextRun({
                  font: "Arial",
                  text: "Refer to page 3",
                  size: 20,
                  italics: true,
                })
              );
            }

            const analysisAndRecommendations = [
              new TextRun({
                font: "Arial",
                text: machine.analysis,
                size: 20,
              }),
              new TextRun({
                text: "\n",
                break: 1,
              }),
              new TextRun({
                text: "\n",
                break: 1,
              }),
              ...recommendations,
            ];

            return new TableRow({
              children: [
                new TableCell({
                  width: { size: 28, type: WidthType.PERCENTAGE },
                  margins: { left: 50, right: 20, top: 80, bottom: 80 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          font: "Arial",
                          text: machine.equipmentAndComponent,
                          size: 20,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 12, type: WidthType.PERCENTAGE },
                  margins: { left: 50, right: 20, top: 200, bottom: 100 },
                  children:
                    machine.previousCondition &&
                    images.find((img) => img.name === machine.previousCondition)
                      ? [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: images.find(
                                  (img) =>
                                    img.name === machine.previousCondition
                                )?.buffer as Uint8Array,
                                transformation: { width: 20, height: 20 },
                                type: "png",
                              }),
                            ],
                          }),
                        ]
                      : [],
                }),

                new TableCell({
                  width: { size: 12, type: WidthType.PERCENTAGE },
                  margins: { left: 50, right: 20, top: 200, bottom: 100 },
                  children:
                    machine.currentCondition &&
                    images.find((img) => img.name === machine.currentCondition)
                      ? [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: images.find(
                                  (img) => img.name === machine.currentCondition
                                )?.buffer as Uint8Array,
                                transformation: { width: 20, height: 20 },
                                type: "png",
                              }),
                            ],
                          }),
                        ]
                      : [],
                }),
                new TableCell({
                  width: { size: 48, type: WidthType.PERCENTAGE },
                  margins: { left: 50, right: 20, top: 10, bottom: 10 },
                  children: [
                    new Paragraph({
                      children: analysisAndRecommendations,
                    }),
                  ],
                }),
              ],
            });
          }),
        ]
      );

      const reportHeader = new Table({
        borders: {
          top: { style: "none", size: 0 },
          bottom: { style: "none", size: 0 },
          left: { style: "none", size: 0 },
          right: { style: "none", size: 0 },
          insideHorizontal: { style: "none", size: 0 },
          insideVertical: { style: "none", size: 0 },
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
                        data: logoBuffer,
                        transformation: { width: 100, height: 100 },
                        type: "png",
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                margins: { top: 50, bottom: 100, right: 400 },
              }),

              new TableCell({
                width: { size: 80, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    spacing: { after: 10, line: 200 },
                    children: [
                      new TextRun({
                        font: "Arial",
                        text: "Vibration Analysis Report",
                        bold: true,
                        size: 17,
                      }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { after: 10, line: 200 },
                    children: [
                      new TextRun({
                        font: "Arial",
                        text: `Client: ${data?.user?.name}`,
                        size: 17,
                      }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { after: 10, line: 200 },
                    children: [
                      new TextRun({
                        font: "Arial",
                        text: `Plant Area: ${data?.area}`,
                        size: 17,
                      }),
                    ],
                  }),
                ],
                margins: { left: 5000, top: 300 },
              }),
            ],
          }),
        ],
      });

      const chunkSize = 10; // Adjust based on how many rows fit per page
      const chunkedTableRows = [];
      for (let i = 0; i < analysisTableRows.length; i += chunkSize) {
        chunkedTableRows.push(analysisTableRows.slice(i, i + chunkSize));
      }

      // Prepare document children with paginated tables and headers
      const docChildren = [
        reportHeader, // First page header
        new Paragraph({ text: "", spacing: { before: 200, after: 300 } }), // Space after header
        new Table({
          width: { size: 90, type: WidthType.PERCENTAGE },
          alignment: AlignmentType.CENTER,
          rows: [
            // Table header row
            new TableRow({
              cantSplit: true,
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 28, type: WidthType.PERCENTAGE },
                  shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                  margins: { left: 50, right: 20, top: 80, bottom: 80 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          font: "Arial",
                          text: "Equipment List",
                          size: 20,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 12, type: WidthType.PERCENTAGE },
                  shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                  margins: { left: 50, right: 20, top: 80, bottom: 80 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          font: "Arial",
                          text: "Previous Condition",
                          size: 20,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 12, type: WidthType.PERCENTAGE },
                  shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                  margins: { left: 50, right: 20, top: 80, bottom: 80 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          font: "Arial",
                          text: "Current Condition",
                          size: 20,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 48, type: WidthType.PERCENTAGE },
                  shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                  margins: { left: 50, right: 20, top: 80, bottom: 80 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          font: "Arial",
                          text: "Analysis and Recommendation",
                          size: 20,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            ...chunkedTableRows[0], // First batch of table rows
          ],
        }),
      ];

      // Add subsequent pages with headers and tables
      for (let i = 1; i < chunkedTableRows.length; i++) {
        docChildren.push(
          new Paragraph({ text: "", pageBreakBefore: true }), // Page break
          reportHeader, // Repeat header on new page
          new Paragraph({ text: "", spacing: { before: 200, after: 300 } }), // Space after header
          new Table({
            width: { size: 90, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              // Table header row (repeat on new page)
              new TableRow({
                cantSplit: true,
                tableHeader: true,
                children: [
                  new TableCell({
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                    margins: { left: 50, right: 20, top: 80, bottom: 80 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font: "Arial",
                            text: "Equipment List",
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 12, type: WidthType.PERCENTAGE },
                    shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                    margins: { left: 50, right: 20, top: 80, bottom: 80 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font: "Arial",
                            text: "Previous Condition",
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 12, type: WidthType.PERCENTAGE },
                    shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                    margins: { left: 50, right: 20, top: 80, bottom: 80 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font: "Arial",
                            text: "Current Condition",
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                    margins: { left: 50, right: 20, top: 80, bottom: 80 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font: "Arial",
                            text: "Analysis and Recommendation",
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              ...chunkedTableRows[i], // Add the next batch of rows
            ],
          })
        );
      }

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
                  insideHorizontal: { style: "none", size: 0 },
                  insideVertical: { style: "none", size: 0 },
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
                                data: logoBuffer,
                                transformation: { width: 100, height: 100 },
                                type: "png",
                                floating: {
                                  horizontalPosition: {
                                    relative:
                                      HorizontalPositionRelativeFrom.PAGE,
                                    offset: 5,
                                  },
                                  verticalPosition: {
                                    relative:
                                      VerticalPositionRelativeFrom.PARAGRAPH,
                                    offset: 0,
                                  },
                                  wrap: {
                                    type: TextWrappingType.SQUARE,
                                  },
                                },
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                        margins: { top: 30, bottom: 100, right: 300 },
                      }),

                      new TableCell({
                        width: { size: 80, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "JAVA",
                                bold: true,
                                size: 20,
                                color: "FF0000",
                              }),
                              new TextRun({
                                font: "Arial",
                                text: " Condition Monitoring Pty Ltd",
                                bold: true,
                                size: 19,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "ABN: XX XXX",
                                size: 17,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "XXXXXX NSW 9000",
                                size: 17,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "XXXX XXX XXXX",
                                size: 17,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "ryan.java@xxxxxxxxxxx.com.au",
                                size: 17,
                              }),
                            ],
                          }),
                        ],
                        margins: { left: 100, top: 200 },
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
                    font: "Arial",
                    text: "Vibration Analysis Report",
                    bold: true,
                    size: 27,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100, after: 300 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Pumps VA Report",
                    bold: true,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 600, after: 14, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Client : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: ` ${data?.user?.name}`,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 14, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Plant Area : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: ` ${data?.area}`,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 14, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Report Number : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: ` ${data?.reportNumber}`,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 14, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Date Inspected : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: " 05 January 2024 ",
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 14, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Date Reported : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: ` ${new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}`,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 300, after: 14, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Job Number : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: `${data?.jobNumber}`,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 14, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Purchase Order Number : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: `${data?.poNumber}`,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 600, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Work Order Number : ",
                    bold: true,
                    size: 19,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: `${data?.woNumber}`,
                    size: 19,
                  }),
                ],
              }),

              ...(imageDataBuffer
                ? [
                    new Paragraph({
                      spacing: { before: 600, after: 500 },
                      alignment: AlignmentType.CENTER,
                      children: [
                        new ImageRun({
                          data: imageDataBuffer,
                          transformation: { width: 600, height: 300 },
                          type: "png",
                        }),
                      ],
                    }),
                  ]
                : []),

              new Paragraph({
                spacing: { before: 600, after: 600, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Data Analysis and Report by",
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 500, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Ryan Java, ",
                    size: 20,
                    underline: { type: UnderlineType.SINGLE },
                  }),
                  new TextRun({
                    font: "Arial",
                    text: "MIEAust, VA Cat 2",
                    italics: true,
                    underline: { type: UnderlineType.SINGLE },
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 600, line: 240 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Condition Monitoring Engineer",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 900, after: 14, line: 240 },
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Disclaimer: ",
                    size: 16,
                    bold: true,
                  }),
                  new TextRun({
                    font: "Arial",
                    text: "All reports issued by Java Condition Monitoring (JCM) are a result of testings using the industry approved instruments with current calibration certiﬁcates, and all data is analysed by technicians who have complied with the required industry experience, holding ISO certiﬁcations on their related ﬁeld of practice. Recommendations are based on, but not limited to, data information, alarm limits, on site observation, and criticality of equipment to the line of operation. JCM ensures that a thorough assessment of machinery health condition has been undertaken prior to report submission. However, the client should acknowledge that the authority of this report is limited only to diagnostics and recommendations; the maintenance actions will only take place upon the approval of the client’s designated authority, and therefore not holding JCM accountable of any indemnity claim or ﬁnancial obligation due to operational losses, machinery damages and other consequences after conducting the maintenance actions.",
                    size: 16,
                  }),
                ],
              }),
            ],
          },
          {
            properties: {
              type: SectionType.NEXT_PAGE,
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
                  insideHorizontal: { style: "none", size: 0 },
                  insideVertical: { style: "none", size: 0 },
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
                                data: logoBuffer,
                                transformation: { width: 100, height: 100 },
                                type: "png",
                              }),
                            ],
                            alignment: AlignmentType.LEFT,
                          }),
                        ],
                        margins: { top: 50, bottom: 100, right: 400 },
                      }),

                      new TableCell({
                        width: { size: 80, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 200 },

                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Vibration Analysis Report",
                                bold: true,
                                size: 17,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: `Client: ${data?.user?.name}`,
                                size: 17,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: `Plant Area: ${data?.area}`,
                                size: 17,
                              }),
                            ],
                          }),
                        ],
                        margins: { left: 5000, top: 300 },
                      }),
                    ],
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 200, after: 50 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Introduction",
                    bold: true,
                    size: 23,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "A 4-weekly routine vibration survey was conducted to determine the conditions Pumps, to monitor any \n defect that was detected, and to recommend maintenance action based on the severity of machinery’s condition. Oil analysis results and bearing temperatures were also considered in the assessment of machinery’s overall health conditions. ",
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Methodology",
                    bold: true,
                    size: 23,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "     - Vibration Analysis",
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "     - Oil Analysis",
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "     - Temperature Monitoring",
                    size: 19,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Testing Equipment",
                    bold: true,
                    size: 23,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "     - CSI 2140 Machinery Health Analyser (S/N B2140XXXXX) with AMS Suite Version 6.33 software",
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "     - 100mV/g accelerometer",
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "     - accelerometer",
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 10, line: 220 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "     - Milwaukee 2268-40 Laser Temp Gun",
                    size: 19,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Condition Description",
                    bold: true,
                    size: 23,
                  }),
                ],
              }),
              new Table({
                width: { size: 90, type: WidthType.PERCENTAGE },
                alignment: AlignmentType.CENTER,
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 10, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50 },
                        verticalAlign: VerticalAlign.BOTTOM,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Symbol",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 15, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50 },
                        verticalAlign: VerticalAlign.BOTTOM,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Condition",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 40, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50 },
                        verticalAlign: VerticalAlign.BOTTOM,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Description",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50 },
                        verticalAlign: VerticalAlign.BOTTOM,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Action",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 10, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50 },
                        verticalAlign: VerticalAlign.BOTTOM,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Risk Category",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: { top: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: images[0].buffer,
                                transformation: { width: 20, height: 20 },
                                type: "png",
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Normal",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Testing results on equipment are within acceptable limits. No indications of a defect are detected in data and no abnormalities are observed in the operation",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "No action is required ",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Low",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: { top: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: images[1].buffer,
                                transformation: { width: 20, height: 20 },
                                type: "png",
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Moderate",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Testing results on equipment are slightly higher than acceptable limits. Minor defects are detected in data and/or minor abnormalities are observed in operation. ",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Continue routine monitoring",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Low",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: { top: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: images[2].buffer,
                                transformation: { width: 20, height: 20 },
                                type: "png",
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Severe",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Testing results on equipment are significantly higher than acceptable limits. Alarming level of defect indications are detected in data and/or pronounced abnormalities are observed in operation.",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "- Preventive action (e.g., greasing, tightening of bolts, etc.)",
                                size: 18,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "\n",
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "- Corrective action (e.g., planned replacement).",
                                size: 18,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "\n",
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "- Close monitoring interval while waiting for replacement.",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "High",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: { top: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: images[3].buffer,
                                transformation: { width: 20, height: 20 },
                                type: "png",
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Crtical",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Testing results on equipment exceeded the maximum allowable limits. High probability of failure is likely to occur if left uncorrected. ",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Immediate corrective action is required ",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Very High",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: { top: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: images[4].buffer,
                                transformation: { width: 20, height: 20 },
                                type: "png",
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Missed Points",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Data are not collected; equipment conditions are unknown. ",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "- Redesign guarding to allow access.",
                                size: 18,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "\n",
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "- Install permanent accelerometer",
                                size: 18,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "\n",
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "- Collect data if machine was not running on previous survey.",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),

                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Unknown",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
            footers: {
              default: new Footer({
                children: [
                  new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: "none", size: 0 },
                      bottom: { style: "none", size: 0 },
                      left: { style: "none", size: 0 },
                      right: { style: "none", size: 0 },
                    },
                    margins: { top: 0, bottom: 0 },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            width: { size: 80, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Pumps VA Report",
                                    size: 18,
                                  }),
                                ],
                                alignment: AlignmentType.LEFT,
                              }),
                            ],
                          }),
                          new TableCell({
                            width: { size: 20, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Page ",
                                  }),
                                  new TextRun({
                                    children: [PageNumber.CURRENT],
                                    bold: true,
                                  }),
                                  new TextRun({
                                    text: " of ",
                                    bold: true,
                                  }),
                                  new TextRun({
                                    children: [PageNumber.TOTAL_PAGES],
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.RIGHT,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            },
          },
          {
            properties: {
              type: SectionType.NEXT_PAGE,
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
                  insideHorizontal: { style: "none", size: 0 },
                  insideVertical: { style: "none", size: 0 },
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
                                data: logoBuffer,
                                transformation: { width: 100, height: 100 },
                                type: "png",
                              }),
                            ],
                            alignment: AlignmentType.LEFT,
                          }),
                        ],
                        margins: { top: 50, bottom: 100, right: 400 },
                      }),

                      new TableCell({
                        width: { size: 80, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 200 },

                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Vibration Analysis Report",
                                bold: true,
                                size: 17,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: `Client: ${data?.user?.name}`,
                                size: 17,
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: { after: 10, line: 200 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: `Plant Area: ${data?.area}`,
                                size: 17,
                              }),
                            ],
                          }),
                        ],
                        margins: { left: 5000, top: 300 },
                      }),
                    ],
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Introduction",
                    bold: true,
                    size: 23,
                  }),
                ],
              }),
              new Table({
                width: { size: 90, type: WidthType.PERCENTAGE },
                alignment: AlignmentType.CENTER,
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 16.66, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50, top: 100, bottom: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "P1",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 16.66, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50, top: 100, bottom: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "P2",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 16.66, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50, top: 100, bottom: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "P3",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 16.66, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50, top: 100, bottom: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "P4",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 16.66, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50, top: 100, bottom: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "P5",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 16.66, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 50, top: 100, bottom: 100 },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "P6",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Immediate action is recommended",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Action within a week is recommended",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Action within a fortnight is recommended",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Action within a month is recommended",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Planned maintenance, approximately within 3 months is recommended",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: { left: 50, right: 50 },
                        children: [
                          new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "No action is required",
                                size: 18,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 500, after: 500 },
                children: [
                  new TextRun({
                    font: "Arial",
                    text: "Maintenance Recommendations",
                    bold: true,
                    size: 23,
                  }),
                ],
              }),
              new Table({
                width: { size: 90, type: WidthType.PERCENTAGE },
                alignment: AlignmentType.CENTER,
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 35, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 20, top: 80, bottom: 80 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Equipment List",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 15, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 20, top: 80, bottom: 80 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Priority",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 20, top: 80, bottom: 80 },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "Action",
                                size: 20,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  ...tableRows,
                ],
              }),
              new Paragraph({
                pageBreakBefore: true,
              }),
            ],
            footers: {
              default: new Footer({
                children: [
                  new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: "none", size: 0 },
                      bottom: { style: "none", size: 0 },
                      left: { style: "none", size: 0 },
                      right: { style: "none", size: 0 },
                    },
                    margins: { top: 0, bottom: 0 },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            width: { size: 80, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Pumps VA Report",
                                    size: 18,
                                  }),
                                ],
                                alignment: AlignmentType.LEFT,
                              }),
                            ],
                          }),
                          new TableCell({
                            width: { size: 20, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Page ",
                                  }),
                                  new TextRun({
                                    children: [PageNumber.CURRENT],
                                    bold: true,
                                  }),
                                  new TextRun({
                                    text: " of ",
                                    bold: true,
                                  }),
                                  new TextRun({
                                    children: [PageNumber.TOTAL_PAGES],
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.RIGHT,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            },
          },
          {
            properties: {
              type: SectionType.CONTINUOUS,
              page: {
                margin: {
                  top: 30 * 20,
                  bottom: 30 * 20,
                  left: 30 * 20,
                  right: 30 * 20,
                },
              },
            },
            children: docChildren,

            footers: {
              default: new Footer({
                children: [
                  new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: "none", size: 0 },
                      bottom: { style: "none", size: 0 },
                      left: { style: "none", size: 0 },
                      right: { style: "none", size: 0 },
                    },
                    margins: { top: 0, bottom: 0 },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            width: { size: 80, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Pumps VA Report",
                                    size: 18,
                                  }),
                                ],
                                alignment: AlignmentType.LEFT,
                              }),
                            ],
                          }),
                          new TableCell({
                            width: { size: 20, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Page ",
                                  }),
                                  new TextRun({
                                    children: [PageNumber.CURRENT],
                                    bold: true,
                                  }),
                                  new TextRun({
                                    text: " of ",
                                    bold: true,
                                  }),
                                  new TextRun({
                                    children: [PageNumber.TOTAL_PAGES],
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.RIGHT,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            },
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
    setDocxLoading(false);
  };

  return (
    <>
      <Button
        onClick={generateDocx}
        className="bg-blue-700 hover:bg-blue-800"
        disabled={loading || docxLoading}
      >
        DOCX
      </Button>
      <div ref={chartRef} className="absolute -left-[99999px]">
        <CustomBarChart graphData={graphData} yAxisValues={yAxisValues} />
      </div>
    </>
  );
};

export default DOCXDownload;
