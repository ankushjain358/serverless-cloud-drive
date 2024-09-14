import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, ImageIcon, MoreHorizontal, VideoIcon } from "lucide-react";
import { getUrl } from 'aws-amplify/storage';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Schema } from '@/amplify/data/resource';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Image } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';


type File = Schema['File']['type'];

interface FileCardProps {
    file: File;
}


const FileCard: React.FC<FileCardProps> = ({ file }) => {

    const truncateFileName = (name: string, maxLength = 20) => {
        if (name.length <= maxLength) return name;
        return name.substring(0, maxLength - 3) + '...';
    };

    const downloadFile = async (fileInput: File) => {
        const linkToStorageFile = await getUrl({
            path: fileInput.s3Key,
            options: {
                contentDisposition: `attachment; filename="${fileInput.fileName}"`,
            }
        });
        window.open(linkToStorageFile.url, '_blank');
    };

    const deleteFile = async (fileInput: File) => {
        toast.error('Not implemented');
    }

    const renameFile = async (fileInput: File) => {
        toast.error('Not implemented');
    }

    const getFileIcon = (filename: string, size: number) => {
        const extension = filename.split('.').pop()?.toLowerCase();
        const iconSize = `w-${size} h-${size}`;

        // image, video, pdf, and other files
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'heic':
                return <ImageIcon className={`${iconSize} text-blue-500`} />;
            case 'mp4':
            case 'avi':
            case 'mov':
                return <VideoIcon className={`${iconSize} text-blue-500`} />;
            default:
                return <FileIcon className={`${iconSize} text-blue-500`} />;
        }
    }

    const getFilePreview = (file: File, size: number) => {
        const extension = file.fileName.split('.').pop()?.toLowerCase();
        const iconSize = `w-${size} h-${size}`;

        // image, video, pdf, and other files
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'heic':
                return <div className='h-32 w-full'>
                    <StorageImage
                        path={file.s3Key}
                        objectFit={'cover'}
                        alt={file.fileName}
                        width="100%"
                        height="100%"
                    ></StorageImage >
                </div>
            case 'mp4':
            case 'avi':
            case 'mov':
                return <VideoIcon className={`${iconSize} text-blue-500`} />;
            default:
                return <FileIcon className={`${iconSize} text-blue-500`} />;
        }
    }


    return (
        <Card className="w-64 h-48 bg-gray-100 relative mb-5">
            <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center space-x-2">
                        {getFileIcon(file.fileName, 5)}
                        <span className="text-sm font-medium">
                            {truncateFileName(file.fileName)}
                        </span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => downloadFile(file)} >Download</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteFile(file)}>Rename</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => renameFile(file)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex-grow bg-white flex items-center justify-center">
                    {getFilePreview(file, 12)}
                </div>
                <CardFooter className="w-full p-2 text-xs bg-gray-100 text-white-500">
                    Created: {moment(file.createdAt).format("DD MMM yyyy")}
                </CardFooter>
            </CardContent>
        </Card>
    );
};

export default FileCard;
