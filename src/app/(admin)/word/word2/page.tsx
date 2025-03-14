"use client";

import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun,
} from "docx";
import { Button } from "@/components/ui/button";

const DOCXGenerator = () => {
  const generateDocx = async () => {
    const graphData = [
      { label: "Jan", value: 5 },
      { label: "Feb", value: 10 },
      { label: "Mar", value: 7 },
      { label: "Apr", value: 12 },
    ];

    const tableRows = graphData.map((data) => (
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(data.label)],
            width: { size: 20, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              new Paragraph(
                new TextRun({
                  text: "█".repeat(data.value), // Using block characters to simulate bars
                  bold: true,
                })
              ),
            ],
            width: { size: 80, type: WidthType.PERCENTAGE },
          }),
        ],
      })
    ));

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph("Bar Graph Representation"),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: tableRows,
            }),
          ],
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
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Button onClick={generateDocx} className="bg-main hover:bg-follow">
        Download DOCX
      </Button>
    </div>
  );
};

export default DOCXGenerator;