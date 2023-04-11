import {Topics} from "../../data/topics";
import {Jokers} from "../../data/jokers";
import {
    FormatQuote,
    Hearing,
    Image,
    ListAlt,
    Numbers,
    QuestionMark,
    Sort,
    TextSnippet,
    VideoLibrary
} from "@mui/icons-material";
import {MediaSchema, MediaTypes} from "../media";
import {SortElementSchema} from "./sort-question";
import {CategorySchema} from "./categorize-question";
import {BiCategory} from "react-icons/bi";
import {z} from "zod";

export enum QuestionTypes {
    Basic = "Basic",
    Quote = "Quote",
    Image = "Image",
    Hearing = "Hearing",
    Video = "Video",
    Choice = "Choice",
    Sort = "Sort",
    Guesstimate = "Guesstimate",
    Categorize = "Categorize"
}

export enum SolutionTypes {
    Text = "Text",
    Image = "Image",
    List = "List"
}

export const QuestionSchema = z.object({
    _id: z.string().optional(),
    type: z.nativeEnum(QuestionTypes),
    caption: z.string(),
    topic: z.nativeEnum(Topics),
    timeInSeconds: z.number(),
    value: z.number(),
    jokerReward: z.nativeEnum(Jokers).optional(),
    solution: z.string(),
    solutionType: z.nativeEnum(SolutionTypes),
    solutionArray: z.array(z.string()).optional(),
    media: MediaSchema.optional(),
    choices: z.array(z.string()).optional(),
    sortElements: z.array(SortElementSchema).optional(),
    unit: z.string().optional(),
    categories: z.array(CategorySchema).optional()
})

type Question = z.infer<typeof QuestionSchema>;

export function getIconByQuestionType(type: QuestionTypes) {
    switch (type) {
        case QuestionTypes.Basic:
            return TextSnippet;
        case QuestionTypes.Quote:
            return FormatQuote;
        case QuestionTypes.Image:
            return Image;
        case QuestionTypes.Hearing:
            return Hearing;
        case QuestionTypes.Video:
            return VideoLibrary;
        case QuestionTypes.Choice:
            return ListAlt;
        case QuestionTypes.Sort:
            return Sort;
        case QuestionTypes.Guesstimate:
            return Numbers;
        case QuestionTypes.Categorize:
            return BiCategory;
        default:
            return QuestionMark;
    }
}

export function getMediaTypeByQuestionType(type: QuestionTypes) {
    switch (type) {
        case QuestionTypes.Image:
            return MediaTypes.Image;
        case QuestionTypes.Hearing:
            return MediaTypes.Audio;
        case QuestionTypes.Video:
            return MediaTypes.Video;
        case QuestionTypes.Quote:
            return MediaTypes.Text;
        default:
            return undefined;
    }
}

export default Question;