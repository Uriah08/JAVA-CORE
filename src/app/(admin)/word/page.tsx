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
  UnderlineType,
  SectionType,
  ShadingType,
} from "docx";
import { renderAsync } from "docx-preview";

const symbols = ["N", "M", "S", "C", "X"];

const recommendations = [
  {
    equipmentName: "Services Pumps SPU303 – CHPP Dirty Water Dam Pump No. 3",
    component: "SPU303 Compressor",
    priority: "P4",
    action:
      "Planned replacement on convenient opportunity is stillrecommended.",
    date: "08 August 2024",
  },
  {
    equipmentName: "Services Pumps SPU303 – CHPP Dirty Water Dam Pump No. 3",
    component: "SPU303 Compressor",
    priority: "P6",
    action: "Java CM will monitor the pump condition on 2-weekly interval.",
    date: "02 September 2024",
  },
];

const machinesHealth = [
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "M",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "C",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "X",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondition: "N",
    currentCondition: "N",
    analysis: "No defects were detected.",
  },
];

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

const DOCXPreview = () => {
  const [docURL, setDocURL] = useState<string | null>(null);

  const generateDocx = async () => {
    try {
      console.log("Generating DOCX...");

      const logo = await fetch("/logo.png");
      const imageArrayBuffer = await logo.arrayBuffer();
      const logoBuffer = new Uint8Array(imageArrayBuffer);

      const images = await fetchImages();

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
                                                    data: logoBuffer,
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

                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Data Analysis and Report by",
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Ryan Java, ",
                      size: 24,
                      underline: { type: UnderlineType.SINGLE }
                    }),
                    new TextRun({
                      text: "MIEAust, VA Cat 2",
                      italics: true,
                      size: 22,
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Condition Monitoring Engineer",
                      size: 20,
                    }),
                  ]
                }),
                new Paragraph({
                  spacing: { after: 14, line: 240 },
                  children: [
                    new TextRun({
                      text: "Disclaimer: ",
                      size: 18,
                      bold: true
                    }),
                    new TextRun({
                      text: "All reports issued by Java Condition Monitoring (JCM) are a result of testings using the industry approved instruments with current calibration certiﬁcates, and all data is analysed by technicians who have complied with the required industry experience, holding ISO certiﬁcations on their related ﬁeld of practice. Recommendations are based on, but not limited to, data information, alarm limits, on site observation, and criticality of equipment to the line of operation. JCM ensures that a thorough assessment of machinery health condition has been undertaken prior to report submission. However, the client should acknowledge that the authority of this report is limited only to diagnostics and recommendations; the maintenance actions will only take place upon the approval of the client’s designated authority, and therefore not holding JCM accountable of any indemnity claim or ﬁnancial obligation due to operational losses, machinery damages and other consequences aŌer conducting the maintenance actions.",
                      size: 18,
                    }),
                  ]
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
                                    margins: { top: 100, bottom: 100, right: 400 },
                                }),
                                
                                new TableCell({
                                    width: { size: 80, type: WidthType.PERCENTAGE },
                                    children: [
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                          
                                            children: [
                                              new TextRun({
                                                text: "Vibration Analysis Report",
                                                bold: true,
                                                size: 18,
                                            }),
                                            ],
                                        }),
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                            children: [
                                                new TextRun({
                                                    text: "Client: Client 1 ",
                                                    size: 18,
                                                }),
                                            ],
                                        }),
                                        new Paragraph({
                                          spacing: { after: 10, line: 200 },
                                            children: [
                                                new TextRun({
                                                  text: "Plant Area: All area",
                                                  size: 18
                                                }),
                                            ],
                                        }),
                                    ],
                                    margins: { left:5000, top: 530 },
                                }),
                            ],
                        }),
                    ],
                }),
                new Paragraph({
                  spacing: { before: 200, after:50 },
                  children: [
                    new TextRun({
                      text: "Introduction",
                      bold: true,
                      size: 24
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "A 4-weekly routine vibration survey was conducted to determine the conditions Pumps, to monitor any \n defect that was detected, and to recommend maintenance action based on the severity of machinery’s condition. Oil analysis results and bearing temperatures were also considered in the assessment of machinery’s overall health conditions. ",
                      size: 20
                    })
                  ]
                }),
                new Paragraph({
                  spacing: { before: 200, after:200 },
                  children: [
                    new TextRun({
                      text: "Methodology",
                      bold: true,
                      size: 24
                    })
                  ]
                }),
                 new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "     - Vibration Analysis",
                      size: 20
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "     - Oil Analysis",
                      size: 20
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "     - Temperature Monitoring",
                      size: 20
                    }),
                  ],
                }),

                new Paragraph({
                  spacing: { before: 200, after:200 },
                  children: [
                    new TextRun({
                      text: "Testing Equipment",
                      bold: true,
                      size: 24
                    })
                  ]
                }),
                 new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "     - CSI 2140 Machinery Health Analyser (S/N B2140XXXXX) with AMS Suite Version 6.33 software",
                      size: 20
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "     - 100mV/g accelerometer",
                      size: 20
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "     - accelerometer",
                      size: 20
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { after: 10, line: 220 },
                  children: [
                    new TextRun({
                      text: "     - Milwaukee 2268-40 Laser Temp Gun",
                      size: 20
                    }),
                  ],
                }),

                new Paragraph({
                  spacing: { before: 200, after:200 },
                  children: [
                    new TextRun({
                      text: "Condition Description",
                      bold: true,
                      size: 24
                    })
                  ]
                }),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 10, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Symbol", size: 20 })] })],
                        }),
                        new TableCell({
                          width: { size: 15, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Condition", size: 20 })] })],
                        }),
                        new TableCell({
                          width: { size: 40, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Description", size: 20 })] })],
                        }),
                        new TableCell({
                          width: { size: 25, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Action", size: 20 })] })],
                        }),
                        new TableCell({
                          width: { size: 10, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Risk Category", size: 20 })] })],
                        }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ 
                          margins: {top: 100},
                          children: [new Paragraph({ 
                          alignment: AlignmentType.CENTER,
                            children: [
                            new ImageRun({
                              data: images[0].buffer,
                              transformation: { width: 20, height: 20 },
                              type:"png"
                            }),
                          ], })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Normal",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Testing results on equipment are within acceptable limits. No indications of a defect are detected in data and no abnormalities are observed in the operation",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "No action is required ",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Low",
                                size: 18
                              })
                            ]
                        })] }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ 
                          margins: {top: 100},
                          children: [new Paragraph({ 
                          alignment: AlignmentType.CENTER,
                            children: [
                            new ImageRun({
                              data: images[1].buffer,
                              transformation: { width: 20, height: 20 },
                              type:"png"
                            }),
                          ], })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Moderate",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Testing results on equipment are slightly higher than acceptable limits. Minor defects are detected in data and/or minor abnormalities are observed in operation. ",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Continue routine monitoring",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Low",
                                size: 18
                              })
                            ]
                        })] }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ 
                          margins: {top: 100},
                          children: [new Paragraph({ 
                          alignment: AlignmentType.CENTER,
                            children: [
                            new ImageRun({
                              data: images[2].buffer,
                              transformation: { width: 20, height: 20 },
                              type:"png"
                            }),
                          ], })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Severe",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Testing results on equipment are significantly higher than acceptable limits. Alarming level of defect indications are detected in data and/or pronounced abnormalities are observed in operation.",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "-Preventive action (e.g., greasing, tightening of bolts, etc.) \n-Corrective action (e.g., planned replacement). \n-Close monitoring interval while waiting for replacement. ",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "High",
                                size: 18
                              })
                            ]
                        })] }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ 
                          margins: {top: 100},
                          children: [new Paragraph({ 
                          alignment: AlignmentType.CENTER,
                            children: [
                            new ImageRun({
                              data: images[3].buffer,
                              transformation: { width: 20, height: 20 },
                              type:"png"
                            }),
                          ], })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Crtical",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Testing results on equipment exceeded the maximum allowable limits. High probability of failure is likely to occur if left uncorrected. ",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Immediate corrective action is required ",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Very High",
                                size: 18
                              })
                            ]
                        })] }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ 
                          margins: {top: 100},
                          children: [new Paragraph({ 
                          alignment: AlignmentType.CENTER,
                            children: [
                            new ImageRun({
                              data: images[4].buffer,
                              transformation: { width: 20, height: 20 },
                              type:"png"
                            }),
                          ], })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Missed Points",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Data are not collected; equipment conditions are unknown. ",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "-Redesign guarding to allow access. \n-Install permanent accelerometer \n-Collect data if machine was not running on previous survey. ",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            children: [
                              new TextRun({
                                text: "Low",
                                size: 18
                              })
                            ]
                        })] }),
                      ],
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
                                  margins: { top: 100, bottom: 100, right: 400 },
                              }),
                              
                              new TableCell({
                                  width: { size: 80, type: WidthType.PERCENTAGE },
                                  children: [
                                      new Paragraph({
                                        spacing: { after: 10, line: 200 },
                                        
                                          children: [
                                            new TextRun({
                                              text: "Vibration Analysis Report",
                                              bold: true,
                                              size: 18,
                                          }),
                                          ],
                                      }),
                                      new Paragraph({
                                        spacing: { after: 10, line: 200 },
                                          children: [
                                              new TextRun({
                                                  text: "Client: Client 1 ",
                                                  size: 18,
                                              }),
                                          ],
                                      }),
                                      new Paragraph({
                                        spacing: { after: 10, line: 200 },
                                          children: [
                                              new TextRun({
                                                text: "Plant Area: All area",
                                                size: 18
                                              }),
                                          ],
                                      }),
                                  ],
                                  margins: { left:5000, top: 530 },
                              }),
                          ],
                      }),
                  ],
              }),
              new Paragraph({
                spacing: { before: 200, after:100 },
                children: [
                  new TextRun({
                    text: "Introduction",
                    bold: true,
                    size: 24
                  })
                ]
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 16.66, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50, top:100, bottom: 100 },
                          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P1", size: 20, bold: true })] })],
                        }),
                        new TableCell({
                          width: { size: 16.66, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50, top:100, bottom: 100 },
                          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P2", size: 20, bold: true })] })],
                        }),
                        new TableCell({
                          width: { size: 16.66, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50, top:100, bottom: 100 },
                          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P3", size: 20, bold: true })] })],
                        }),
                        new TableCell({
                          width: { size: 16.66, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50, top:100, bottom: 100 },
                          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P4", size: 20, bold: true })] })],
                        }),
                        new TableCell({
                          width: { size: 16.66, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50, top:100, bottom: 100 },
                          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P5", size: 20, bold: true })] })],
                        }),
                        new TableCell({
                          width: { size: 16.66, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 50, top:100, bottom: 100 },
                          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P6", size: 20, bold: true })] })],
                        }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [new Paragraph({ 
                            spacing: { after: 10, line: 220 },
                            children: [
                            new TextRun({
                              text: "Immediate action is recommended",
                              size: 18
                            })
                          ], })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Action within a week is recommended",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                            spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Action within a fortnight is recommended",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Action within a month is recommended",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "Planned maintenance, approximately within 3 months is recommended",
                                size: 18
                              })
                            ]
                        })] }),
                        new TableCell({ 
                          margins: { left: 50, right: 50},
                          children: [
                            new Paragraph({
                              spacing: { after: 10, line: 220 },
                            children: [
                              new TextRun({
                                text: "No action is required",
                                size: 18
                              })
                            ]
                        })] }),
                      ],
                    }),
                ]
              }),
              new Paragraph({
                spacing: { before: 500, after:100 },
                children: [
                  new TextRun({
                    text: "Maintenance Recommendations",
                    bold: true,
                    size: 24
                  })
                ]
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 35, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Equipment List", size: 20, bold: true })] })],
                        }),
                        new TableCell({
                          width: { size: 15, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Priority", size: 20, bold: true })] })],
                        }),
                        new TableCell({
                          width: { size: 50, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Action", size: 20, bold: true })] })],
                        }),
                      ],
                    }),
                ]
              }),
              ...recommendations.map(({ equipmentName, component, priority, action, date }) => [
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: { top: {style: "none", size: 0} },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 100, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: equipmentName, size: 20, bold: true })] })],
                        }),
                      ]
                    })
                  ]
                }),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: { top: {style: "none", size: 0} },
                  rows: [
                    new TableRow({
                        children: [
                          new TableCell({
                            width: { size: 35, type: WidthType.PERCENTAGE },
                            margins: { left: 50, right: 20, top:10, bottom: 10 },
                            children: [new Paragraph({ children: [new TextRun({ text: component, size: 20 })] })],
                          }),
                          new TableCell({
                            width: { size: 15, type: WidthType.PERCENTAGE },
                            margins: { left: 50, right: 20, top:10, bottom: 10 },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: priority, size: 20, bold: true })] })],
                          }),
                          new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            margins: { left: 50, right: 20, top:10, bottom: 10 },
                            children: [
                              new Paragraph({ 
                                spacing: { after: 10, line: 220 },
                                children: [
                                new TextRun({ 
                                  text: `${priority}:`, 
                                  size: 20 ,
                                  bold: true
                                }),
                                new TextRun({ 
                                  text: `${action} \n\n${date}`, 
                                  size: 20 ,
                                })
                              ] 
                            })
                            ],
                          }),
                        ],
                      }),
                  ]
                }),
              ]).flat(),
            ]
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
                                                  data: logoBuffer,
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
                                              text: "Vibration Analysis Report",
                                              bold: true,
                                              size: 18,
                                          }),
                                          ],
                                      }),
                                      new Paragraph({
                                        spacing: { after: 10, line: 200 },
                                          children: [
                                              new TextRun({
                                                  text: "Client: Client 1 ",
                                                  size: 18,
                                              }),
                                          ],
                                      }),
                                      new Paragraph({
                                        spacing: { after: 10, line: 200 },
                                          children: [
                                              new TextRun({
                                                text: "Plant Area: All area",
                                                size: 18
                                              }),
                                          ],
                                      }),
                                  ],
                                  margins: { left:5000, top: 530 },
                              }),
                          ],
                      }),
                  ],
              }),
              new Paragraph({
                spacing: { before: 200, after:100 },
                children: [
                  new TextRun({
                    text: "Machinery Health Condition Reports",
                    bold: true,
                    size: 24
                  })
                ]
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 28, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 20, top:10, bottom: 10 },
                        children: [new Paragraph({ children: [new TextRun({ text: "Equipment List", size: 20, bold: true })] })],
                      }),
                      new TableCell({
                        width: { size: 12, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 20, top:10, bottom: 10 },
                        children: [new Paragraph({ spacing: { after: 10, line: 200 }, children: [new TextRun({ text: "Previous Condition", size: 20, bold: true })] })],
                      }),
                      new TableCell({
                        width: { size: 12, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 20, top:10, bottom: 10 },
                        children: [new Paragraph({ spacing: { after: 10, line: 200 }, children: [new TextRun({ text: "Current Condition", size: 20, bold: true })] })],
                      }),
                      new TableCell({
                        width: { size: 48, type: WidthType.PERCENTAGE },
                        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                        margins: { left: 50, right: 20, top:10, bottom: 10 },
                        children: [new Paragraph({ children: [new TextRun({ text: "Analysis and Recommendation", size: 20, bold: true })] })],
                      }),
                    ]
                  })
                ]
              }),
              ...machinesHealth.map(({ equipmentName, components, previousCondition, currentCondition, analysis }) => [
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: { top: {style: "none", size: 0} },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 100, type: WidthType.PERCENTAGE },
                          shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: equipmentName, size: 20, bold: true })] })],
                        }),
                      ]
                    })
                  ]
                }),
                new Table({
                  borders: { top: {style: "none", size: 0} },
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 28, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: components, size: 20 })] })],
                        }),
                        new TableCell({
                          width: { size: 12, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:200, bottom: 100 },
                          children: [
                            new Paragraph({ 
                              alignment: AlignmentType.CENTER,
                                children: [
                                new ImageRun({
                                  data: previousCondition === 'N' ? images[0].buffer : previousCondition === 'M' ? images[1].buffer : previousCondition === 'S' ? images[2].buffer : previousCondition === 'C' ? images[3].buffer : images[4].buffer,
                                  transformation: { width: 20, height: 20 },
                                  type:"png"
                                }),
                              ], 
                            })
                          ],
                        }),
                        new TableCell({
                          width: { size: 12, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:200, bottom: 100 },
                          children: [
                            new Paragraph({ 
                              alignment: AlignmentType.CENTER,
                                children: [
                                new ImageRun({
                                  data: currentCondition === 'N' ? images[0].buffer : currentCondition === 'M' ? images[1].buffer : currentCondition === 'S' ? images[2].buffer : currentCondition === 'C' ? images[3].buffer : images[4].buffer,
                                  transformation: { width: 20, height: 20 },
                                  type:"png"
                                }),
                              ], 
                            })
                          ],
                        }),
                        new TableCell({
                          width: { size: 48, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: analysis, size: 20 })] })],
                        }),
                      ]
                    }),
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 28, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: components, size: 20 })] })],
                        }),
                        new TableCell({
                          width: { size: 12, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:200, bottom: 100 },
                          children: [
                            new Paragraph({ 
                              alignment: AlignmentType.CENTER,
                                children: [
                                new ImageRun({
                                  data: images[0].buffer,
                                  transformation: { width: 20, height: 20 },
                                  type:"png"
                                }),
                              ], 
                            })
                          ],
                        }),
                        new TableCell({
                          width: { size: 12, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:200, bottom: 100 },
                          children: [
                            new Paragraph({ 
                              alignment: AlignmentType.CENTER,
                                children: [
                                new ImageRun({
                                  data: images[0].buffer,
                                  transformation: { width: 20, height: 20 },
                                  type:"png"
                                }),
                              ], 
                            })
                          ],
                        }),
                        new TableCell({
                          width: { size: 48, type: WidthType.PERCENTAGE },
                          margins: { left: 50, right: 20, top:10, bottom: 10 },
                          children: [new Paragraph({ children: [new TextRun({ text: "Same indication as the pump at a lower level.", size: 20 })] })],
                        }),
                      ]
                    })
                  ]
                }),
              ]).flat(),
            ]
          }
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
      <div id="doc-preview" className="border mt-4 p-4 bg-white"></div>
    </div>
  );
};

export default DOCXPreview;
