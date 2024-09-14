"use client";

import React, { useState } from "react";
import { Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";

type Folder = Schema['Folder']['type'];

interface FolderListProps {
    folders: Folder[];
}

const FolderList: React.FC<FolderListProps> = ({ folders }) => {

    console.log("FolderList rendered")
    const router = useRouter();

    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

    const handleClick = (folderId: string) => {
        setSelectedFolder(folderId);
    };

    const handleDoubleClick = (folderId: string) => {

        console.log(`Folder double-clicked: ${folderId}`);

        // Add your logic here, e.g., opening the folder
        router.push("/drive/folder/" + folderId);
    };

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {folders.length === 0 && (
                <div className="text-center col-span-3">
                    <p className="text-gray-500">No folders found.</p>
                </div>
            )}

            {folders.map((folder) => (
                <div
                    key={folder.id}
                    className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer",
                        "w-32 h-32", // Make boxes square
                        selectedFolder === folder.id
                            ? "bg-blue-100 dark:bg-blue-800" // Selected state
                            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" // Default and hover state
                    )}
                    onClick={() => handleClick(folder.id)}
                    onDoubleClick={() => handleDoubleClick(folder.id)}
                >
                    <Folder className="w-12 h-12 text-blue-500" />
                    <span className="mt-2 text-sm font-medium text-center break-words select-none">
                        {folder.folderName}
                    </span>
                </div>
            ))}
        </div>

    );
};

export default FolderList;
