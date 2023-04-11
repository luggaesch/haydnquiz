import {z} from "zod";

export enum MediaTypes {
    "Audio" = "Audio",
    "Video" = "Video",
    "Image" = "Image",
    "Text" = "Text"
}

export const MediaSchema = z.object({
    _id: z.string().optional(),
    type: z.nativeEnum(MediaTypes),
    content: z.string().optional(),
    sources: z.array(z.string()).optional()
});



type Media = z.infer<typeof MediaSchema>;

export default Media;