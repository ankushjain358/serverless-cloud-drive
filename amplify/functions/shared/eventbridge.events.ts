export interface ImageUploadedEventDetail {
    fileId: string;
    objectKey: string;
    userId: string;
}

export interface VideoUploadedEventDetail {
    fileId: string;
    objectKey: string;
    userId: string;
}

export enum EventSource {
    CloudDrive = "cloud-drive"
}

export enum EventType {
    ImageUploadedEvent = "ImageUploadedEvent",
    VideoUploadedEvent = "VideoUploadedEvent"
}