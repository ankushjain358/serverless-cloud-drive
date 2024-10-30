"use client";

import React, { useEffect, useState } from "react";
import { File, Files, } from "lucide-react";
import { Schema } from "@/amplify/data/resource";
import FileCard from "./FileCard";
import toast from "react-hot-toast";
import { getUrl } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/api";
import Lightbox, { CustomSlide, GenericSlide, Slide, SlideImage, SlideVideo } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import notificationService from "@/services/NotificationService";
import { useDialog } from "../providers/DialogProvider";

const client = generateClient<Schema>()
type File = Schema['File']['type'];

interface FileListProps {
    files: File[];
}

declare module "yet-another-react-lightbox" {
    export interface CustomSlide extends GenericSlide {
        type: "custom-slide";
        s3Key: string;
        fileName: string;
    }

    interface SlideTypes {
        "custom-slide": CustomSlide;
    }
}

function isCustomSlide(slide: Slide): slide is CustomSlide {
    return slide.type === "custom-slide";
}

const FileList: React.FC<FileListProps> = ({ files }) => {

    console.log("FileList rendered")
    const { showDialog } = useDialog();
    const [selectedFile, setselectedFile] = useState<string | null>(null);

    const [refreshUI, setRefreshUI] = React.useState(new Date());

    const [open, setOpen] = React.useState(false);
    const [lightboxIndex, setLightboxIndex] = React.useState(0);
    const [slides, setSlides] = React.useState<Slide[]>([]);

    const onSingleClick = (file: File) => {
        setselectedFile(file.id);
    };

    const onDeleteClick = async (file: File) => {
        showDialog({
            title: "Confirmation",
            description: "Are you sure you want to delete this file?",
            cancelText: "No, Cancel",
            actionText: "Yes, Delete",
            onAction: async () => {

                // 1. Perform delete
                const { data: deleteResponse, errors: deleteErrors } = await client.models.File.delete({
                    id: file.id
                });

                // 2. Show delete errors
                if (deleteErrors) {
                    console.error(deleteErrors);
                    notificationService.errors(deleteErrors.map(error => error.message));
                    return;
                }

                // 3. Show success
                if (deleteResponse) {

                    // Remove folder from the list
                    files.splice(files.indexOf(file), 1);

                    // Show success
                    notificationService.success(`${file.fileName} deleted successfully`);

                    // Trigger UI refresh
                    setRefreshUI(new Date());
                }

            }
        })
    };

    const onDoubleClick = (file: File) => {
        // Handle double click event
        // toast.success(`${file.fileName} double clicked`);
        setOpen(true);
        setLightboxIndex(files.indexOf(file));
    };

    const onDownloadClick = async (file: File) => {
        const linkToStorageFile = await getUrl({
            path: file.s3Key,
            options: {
                contentDisposition: `attachment; filename="${file.fileName}"`,
            }
        });
        window.open(linkToStorageFile.url, '_blank');
    };

    const onRenameClick = (file: File) => {
        // Handle rename click event
        toast.success(`${file.fileName} rename clicked`);
    };

    async function createSlides(files: File[]): Promise<Slide[]> {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'heic'];
        const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

        const slides: Slide[] = await Promise.all(files.map(async (file) => {
            const extension = file.fileName.split('.').pop()!.toLowerCase();

            if (imageExtensions.includes(extension)) {
                return {
                    type: "custom-slide",
                    s3Key: file.s3Key,
                    fileName: file.fileName
                } as CustomSlide;
            } else if (videoExtensions.includes(extension)) {
                const videoUrl = await getUrl({
                    path: file.s3Key
                });
                return {
                    type: "video",
                    width: 1280,
                    height: 720,
                    poster: "/images/video-poster.png",
                    sources: [
                        {
                            src: videoUrl.url,
                            type: "video/mp4",
                        },
                    ],
                } as unknown as SlideVideo;
            } else {
                return {
                    src: "/images/file-poster.png",
                } as SlideImage;
            }
        }));

        return slides;
    }

    useEffect(() => {
        createSlides(files).then((slides) => {
            setSlides(slides);
        });
    }, [refreshUI])

    return (
        <>
            <div className="flex flex-wrap gap-4 p-4">
                {files.length === 0 && (
                    <div className="text-center col-span-3">
                        <p className="text-gray-500">No files found.</p>
                    </div>
                )}

                <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {files.map((file) => (
                        <FileCard
                            key={file.id}
                            file={file}
                            onSingleClick={onSingleClick}
                            onDeleteClick={onDeleteClick}
                            onDoubleClick={onDoubleClick}
                            onDownloadClick={onDownloadClick}
                            onRenameClick={onRenameClick}
                        />
                    ))}
                </div>
            </div>

            <Lightbox
                index={lightboxIndex}
                open={open}
                close={() => setOpen(false)}
                plugins={[Video]}
                slides={slides}
                render={{
                    slide: ({ slide }) => {
                        if (slide.type === 'custom-slide') {
                            return (
                                <StorageImage
                                    path={slide.s3Key}
                                    objectFit={'contain'}
                                    alt={slide.fileName}
                                // width="100%"
                                // height="100%"
                                />
                            )
                        }
                        return null; // Default rendering for other slide types
                    },
                }}
            />

        </>

    );
};

export default FileList;
