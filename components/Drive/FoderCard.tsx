import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderIcon, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Schema } from '@/amplify/data/resource';
import moment from 'moment';


type Folder = Schema['Folder']['type'];

interface FolderCardProps {
    folder: Folder;
    onSingleClick: (file: Folder) => void;
    onDoubleClick: (file: Folder) => void;
    onDeleteClick: (file: Folder) => void;
    onRenameClick: (file: Folder) => void;
}


const FolderCard: React.FC<FolderCardProps> = ({
    folder,
    onSingleClick,
    onDeleteClick,
    onDoubleClick,
    onRenameClick
}) => {

    return (
        <Card className="bg-gray-100 relative mb-5 select-none hover:bg-gray-200" onClick={() => onSingleClick(folder)}>
            <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className="text-sm font-medium truncate block">
                            {folder.folderName}
                        </span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 flex-shrink-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onRenameClick(folder)}>Rename</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDeleteClick(folder)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="h-24 flex-grow bg-white flex items-center justify-center" onDoubleClick={() => onDoubleClick(folder)}>
                    <FolderIcon className="h-12 w-12 text-blue-500" />
                </div>
                <CardFooter className="w-full p-2 text-xs text-white-500 truncate">
                    Created: {moment(folder.createdAt).format("DD MMM yyyy")}
                </CardFooter>
            </CardContent>
        </Card>
    );
};

export default FolderCard;
