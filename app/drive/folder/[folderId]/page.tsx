"use client"

import { Schema } from "@/amplify/data/resource";
import FileManagerComponent from "@/components/Drive/FileManagerComponent";
import FolderDialog from "@/components/Drive/FolderDialog";
import FolderList from "@/components/Drive/FolderList";
import FileList from "@/components/Drive/FileList";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Breadcrumb, { BreadcrumbLink } from "@/components/Drive/Breadcrumb";
import _ from 'lodash'

type Folder = Schema['Folder']['type'];
type File = Schema['File']['type'];
const client = generateClient<Schema>()

export default function Folder({ params }: { params: { folderId: string } }) {

  const CURRENT_FOLDER_ID = params.folderId

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbLink[]>([]);

  useEffect(() => {

    async function loadDataAsync() {
      const { data: current_folder } = await client.models.Folder.get({ id: CURRENT_FOLDER_ID });
      const { data: child_folders } = await current_folder!.childFolders()
      const { data: files } = await current_folder!.files()

      setCurrentFolder(current_folder!);
      setFolders(_.orderBy(child_folders, ["createdAt"]))
      setFiles(_.orderBy(files, ["createdAt"]))

      // subscribe mutations
      const fileSubscription = client.models.File.onCreate({
        filter: {
          folderId: {
            eq: CURRENT_FOLDER_ID,
          },
        },
      }).subscribe({
        next: (data) => {
          setFiles((files) => [...files, data]);
        },
        error: (error) => console.error(error)
      });

      const folderSubscription = client.models.Folder.onCreate({
        filter: {
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


      // set breadcrumbs
      const breadcrumbs = [];

      let currentFolder: Folder | undefined | null = current_folder;
      while (currentFolder) {
        breadcrumbs.push({ name: currentFolder.folderName, href: `/drive/folder/${currentFolder.id}` });
        currentFolder = (await currentFolder.parentFolder()).data
      }

      breadcrumbs.push({ name: 'Home', href: '/drive' });
      setBreadcrumbs(breadcrumbs.reverse());

      return () => {
        fileSubscription.unsubscribe();
        folderSubscription.unsubscribe();
      }
    }

    loadDataAsync();

  }, []);

  return (
    <>

      {/* Add folder button */}
      <div className="py-4">
        <div className="flex justify-between items-center">
          {/* Breadcrumb */}
          <nav className="flex" aria-label="Breadcrumb">
            <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
          </nav>

          {/* Add folder button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>+ Add</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setIsDialogOpen(true)} className="cursor-pointer">
                Add Folder
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowUploader(true)} className="cursor-pointer">
                Upload Files
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* File manager component */}
      <FileManagerComponent
        showUploader={showUploader}
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
          <h3 className="text-2xl font-semibold leading-none tracking-tight">{currentFolder?.folderName}</h3>
        </div>

        {/* Folder list component */}
        <FolderList folders={folders} />

        <hr className="my-4" />

        {/* File list component */}
        <FileList files={files} />
      </div>


    </>

  );
}
