"use client";

import React, { useState } from "react";
import { File, } from "lucide-react";
import { cn } from "@/lib/utils";
import { Schema } from "@/amplify/data/resource";
import FileCard from "./FileCard";

type File = Schema['File']['type'];

interface FileListProps {
    files: File[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {

    console.log("FileList rendered")

    const [selectedFile, setselectedFile] = useState<string | null>(null);

    const handleClick = (fileId: string) => {
        setselectedFile(fileId);
    };

    const handleDoubleClick = (fileId: string) => {
        console.log(`File double-clicked: ${fileId}`);
    };

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {files.length === 0 && (
                <div className="text-center col-span-3">
                    <p className="text-gray-500">No files found.</p>
                </div>
            )}

            {files.map((file) => (
                <FileCard key={file.id} file={file} />
            ))}
        </div>

    );
};

export default FileList;
