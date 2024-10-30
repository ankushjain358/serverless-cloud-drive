import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, ImageIcon, MoreHorizontal, VideoIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Schema } from '@/amplify/data/resource';
import moment from 'moment';
import { StorageImage } from '@aws-amplify/ui-react-storage';


type File = Schema['File']['type'];

interface FileCardProps {
    file: File;
    onSingleClick: (file: File) => void;
    onDoubleClick: (file: File) => void;
    onDeleteClick: (file: File) => void;
    onRenameClick: (file: File) => void;
    onDownloadClick: (file: File) => void;
}


const FileCard: React.FC<FileCardProps> = ({
    file,
    onSingleClick,
    onDeleteClick,
    onDoubleClick,
    onDownloadClick,
    onRenameClick
}) => {


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
            case 'mkv':
                return <VideoIcon className={`${iconSize} text-blue-500`} />;
            default:
                return <FileIcon className={`${iconSize} text-blue-500`} />;
        }
    }

    const getFilePreview = (file: File, size: number) => {
        const extension = file.fileName.split('.').pop()?.toLowerCase();
        const iconSize = `w-${size} h-${size}`;

        // Note: Backend does thumbnail processing on only selected extensions.
        // But here we will consider more extensions for images and videos.
        // For exampple, git, and heic are images but not processed for thumnail.
        // For more detail, refer file-cdc-lambda

        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'heic'];
        const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

        if (file.thumbnailS3Key) {
            return (
                <div className='h-full w-full'>
                    <StorageImage
                        path={file.thumbnailS3Key}
                        objectFit={'cover'}
                        alt={file.fileName}
                        width="100%"
                        height="100%"
                    />
                </div>
            );
        }

        if (imageExtensions.includes(extension || '')) {
            return <ImageIcon className={`${iconSize} text-blue-500`} />;
        }

        if (videoExtensions.includes(extension || '')) {
            return <VideoIcon className={`${iconSize} text-blue-500`} />;
        }

        return <FileIcon className={`${iconSize} text-blue-500`} />;
    };


    return (
        <Card className="bg-gray-100 relative mb-5 select-none hover:bg-gray-200" onClick={() => onSingleClick(file)}>
            <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                        {getFileIcon(file.fileName, 5)}
                        <span className="text-sm font-medium truncate block">
                            {file.fileName}
                        </span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 flex-shrink-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onDownloadClick(file)}>Download</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onRenameClick(file)}>Rename</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDeleteClick(file)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="h-32 flex-grow bg-white flex items-center justify-center" onDoubleClick={() => onDoubleClick(file)}>
                    {getFilePreview(file, 12)}
                </div>
                <CardFooter className="w-full p-2 text-xs text-white-500 truncate">
                    Created: {moment(file.createdAt).format("DD MMM yyyy")}
                </CardFooter>
            </CardContent>
        </Card>
    );
};

export default FileCard;
