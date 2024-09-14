"use client";

import { useRef } from "react";
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import React from "react";

const client = generateClient<Schema>()

// Component props
type FileManagerComponentProps = {
  currentFolderId: string;
  showUploader: boolean;
};

// create a class for file with few props
class UploadedFileClass {
  originalName: string;
  extention: string;
  s3Key: string;
  folderId: string;
  size: number

  constructor(originalName: string, extention: string, s3Key: string, folderId: string, size: number) {
    this.originalName = originalName;
    this.extention = extention;
    this.s3Key = s3Key;
    this.folderId = folderId;
    this.size = size;
  }
}

const saveFile = async (uploadedFile: UploadedFileClass) => {

  const { data, errors } = await client.models.File.create({
    fileType: 'DOCUMENT',
    fileName: uploadedFile.originalName,
    extension: uploadedFile.extention,
    folderId: uploadedFile.folderId,
    s3Key: uploadedFile.s3Key,
    thumbnailS3Key: null,
    size: uploadedFile.size,
  }, {
    authMode: 'userPool'
  })

  if (errors) {
    toast.error(`Error uploading ${uploadedFile.originalName}`);
    console.error(errors);
    return;
  }

  toast.success(`${uploadedFile.originalName} uploaded successfully`);
};

// Component definition
const FileManagerComponent = ({ showUploader, currentFolderId }: FileManagerComponentProps) => {


  const itemsRef = useRef<UploadedFileClass[]>([]);

  return (
    <>
      {showUploader &&
        <div className="py-6">
          <StorageManager
            // acceptedFileTypes={["image/*", "video/*", "audio/*", ".pdf"]}
            path="drive/"
            maxFileSize={1024 * 1024 * 100}
            maxFileCount={10}
            isResumable
            processFile={async (params: any): Promise<any> => {

              // prepare required data
              const { userId } = await getCurrentUser();
              const fileExtension = params.file.name.split('.').pop();
              const s3Key = `${userId}/${uuidv4()}.${fileExtension}`.toLowerCase();

              // push to state array
              itemsRef.current.push(new UploadedFileClass(
                params.file.name,
                fileExtension,
                `drive/${s3Key}`,
                currentFolderId,
                params.file.size));

              // return item
              return {
                file: params.file,
                key: s3Key,
              };
            }}
            onUploadStart={(data) => {
              console.log(data);
            }}
            onUploadSuccess={({ key }) => {
              const uploadedFile = itemsRef.current.find(item => item.s3Key === key);
              if (uploadedFile) {
                saveFile(uploadedFile)
              }
            }}
            onUploadError={(error: string, file: any) => {
              console.error(error);
              toast.error(`Error uploading ${file.name}`)
            }}
          />
        </div>
      }
    </>
  );
};

export default FileManagerComponent;
