"use client";

import React, { useState } from "react";
import { Folder } from "lucide-react";
import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import FolderCard from "./FolderCard";
import toast from "react-hot-toast";
import { useDialog } from "../providers/DialogProvider";
import { generateClient } from "aws-amplify/api";
import notificationService from "@/services/NotificationService";

// Amplify stuff
type Folder = Schema['Folder']['type'];
type File = Schema['File']['type'];
const client = generateClient<Schema>()


interface FolderListProps {
    folders: Folder[];
}

const FolderList: React.FC<FolderListProps> = ({ folders }) => {

    console.log("FolderList rendered");
    const router = useRouter();
    const { showDialog } = useDialog();

    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

    const onDeleteClick = async (folder: Folder) => {
        showDialog({
            title: "Confirmation",
            description: "Are you sure you want to delete this folder?",
            cancelText: "No, Cancel",
            actionText: "Yes, Delete",
            onCancel: () => console.log("Cancelled"),
            onAction: async () => {

                // Get the folder
                const { data, errors } = await client.models.Folder.get({
                    id: folder.id
                });

                // Return in case of error
                if (errors) {
                    console.error(errors);
                    notificationService.errors(errors.map(error => error.message));
                    return;
                }

                if (data) {

                    // Validations
                    // 1. Check if current folder contains child folders or files
                    const fileCount = (await data.files()).data.length;
                    const folderCount = (await data.childFolders()).data.length;

                    if (fileCount > 0 || folderCount > 0) {
                        notificationService.error("Can't delete as folder is not empty!");
                        return;
                    }

                    // 2. Perform delete
                    const { data: deleteResponse, errors: deleteErrors } = await client.models.Folder.delete({
                        id: folder.id
                    });

                    // 3. Show delete errors
                    if (deleteErrors) {
                        console.error(deleteErrors);
                        notificationService.errors(deleteErrors.map(error => error.message));
                        return;
                    }

                    // 4. Show success
                    if (deleteResponse) {

                        // Remove folder from the list
                        folders.splice(folders.indexOf(folder), 1);

                        // Show success
                        notificationService.success(`${folder.folderName} deleted successfully`);
                    }
                }
            }
        });
    }

    const onDoubleClick = (folder: Folder) => {
        router.push("/drive/folder/" + folder.id);
    }

    const onSingleClick = (folder: Folder) => {
        setSelectedFolder(folder.id);
    };

    const onRenameClick = (folder: Folder) => {
        toast.success(`${folder.folderName} rename clicked`);
    };

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {folders.length === 0 && (
                <div className="text-center col-span-3">
                    <p className="text-gray-500">No folders found.</p>
                </div>
            )}

            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {folders.map((folder) => (
                    <FolderCard
                        key={folder.id}
                        folder={folder}
                        onSingleClick={onSingleClick}
                        onDeleteClick={onDeleteClick}
                        onDoubleClick={onDoubleClick}
                        onRenameClick={onRenameClick}
                    />
                ))}
            </div>
        </div>
    );

};

export default FolderList;
