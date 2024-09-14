"use client"

import { Schema } from "@/amplify/data/resource";
import FileManagerComponent from "@/components/Drive/FileManagerComponent";
import FolderDialog from "@/components/Drive/FolderDialog";
import FolderList from "@/components/Drive/FolderList";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "aws-amplify/auth";
import _ from 'lodash'

const CURRENT_FOLDER_ID = "ROOT"
type Folder = Schema['Folder']['type'];
const client = generateClient<Schema>()

export default function Home() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {

    async function loadDataAsync() {

      const { userId } = await getCurrentUser();
      const { data: current_user } = await client.models.User.get({ id: userId });
      const { data: folders } = await current_user!.folders()

      var root_folders = folders.filter((folder) => folder.parentFolderId === CURRENT_FOLDER_ID)

      setFolders(_.orderBy(root_folders, ["createdAt"]));


      // subscribe mutations
      const folderSubscription = client.models.Folder.onCreate({
        filter: {
          userId: {
            eq: userId
          },
          parentFolderId: {
            eq: CURRENT_FOLDER_ID,
          },
        },
      }).subscribe({
        next: (data) => {
          setFolders((folders) => [...folders, data]);
        },
        error: (error) => console.error(error)
      });

      return () => {
        folderSubscription.unsubscribe();
      }
    }

    loadDataAsync();

  }, []);

  return (
    <>
      {/* Add folder button */}
      <div className="py-2">
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>+ Add</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setIsDialogOpen(true)} className="cursor-pointer">
                Add Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* File manager component */}
      < FileManagerComponent
        showUploader={false}
        currentFolderId={CURRENT_FOLDER_ID}
      />

      {/* Folder dialog component */}
      <FolderDialog
        currentFolderId={CURRENT_FOLDER_ID}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full p-6">
        <div className="flex flex-col space-y-1.5 p-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Folders</h3>
          <p className="text-sm text-muted-foreground">
            Manage your folders </p></div>

        {/* Folder list component */}
        <FolderList folders={folders} />
      </div>
    </>

  );
}
