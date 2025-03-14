"use client"

import React, { useRef } from "react";
import { Document, Packer, Paragraph, ImageRun } from "docx";
import { renderAsync } from "docx-preview";
import html2canvas from "html2canvas";
import CustomBarChart from "@/components/container/charts/ReportChart";

const DocxPreview = () => {
  const chartRef = useRef(null);

  const generateDocx = async () => {
    let imageDataBuffer = null;
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imageDataUrl = canvas.toDataURL("image/png");
      imageDataBuffer = await fetch(imageDataUrl).then((res) => res.arrayBuffer());
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: (
            imageDataBuffer
              ? [
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: imageDataBuffer,
                        transformation: { width: 610, height: 300 },
                        type: "png"
                      }),
                    ],
                  }),
                ]
              : []
          ),
        },
      ],
    });

    return Packer.toBlob(doc);
  };

    const showPreview = async () => {
      const blob = await generateDocx();
      const container = document.getElementById("docx-preview");
      if (container) {
        container.innerHTML = "";
        await renderAsync(blob, container);
      }
    };
  
    const downloadDocx = async () => {
      const blob = await generateDocx();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "document.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div className="p-4">
      <button
        onClick={showPreview}
        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
      >
        Show DOCX Preview
      </button>
      <button
        onClick={downloadDocx}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download DOCX
      </button>
      <div ref={chartRef} style={{ position: "absolute", left: "-9999px" }}>
        <CustomBarChart />
      </div>
      <div id="docx-preview" className="mt-4 border p-2 bg-gray-100"></div>
    </div>
  );
};

export default DocxPreview;