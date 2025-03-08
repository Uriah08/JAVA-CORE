"use client";

import { Button } from "@/components/ui/button";
import { Document, Packer, Paragraph, TextRun } from "docx";

const DOCXDownload = () => {
  const generateDocx = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun("Hello, World!")],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.docx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={generateDocx} className="bg-main hover:bg-follow">
      DOCX
    </Button>
  );
};

export default DOCXDownload;
