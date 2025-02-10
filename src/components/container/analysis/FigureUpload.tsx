"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function FigureUpload() {
  const [, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  return (
    <div className="w-full mt-3 max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload}/>
    </div>
  );
}