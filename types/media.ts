
export enum MediaTypes {
    "Audio" = "Audio",
    "Video" = "Video",
    "Image" = "Image",
    "Text" = "Text"
}

export interface MediaInterface {
    _id?: string,
    type: MediaTypes,
    content?: string,
    sources?: string[]
}

type Media = {
    _id?: string,
    type: MediaTypes,
    content?: string,
    sources?: string[]
}

export default Media;