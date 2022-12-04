import {Topics} from "../../data/topics";
import {Jokers} from "../../data/jokers";
import {FormatQuote, Hearing, Image, ListAlt, Numbers, Sort, TextSnippet, VideoLibrary} from "@mui/icons-material";
import Media, {MediaTypes} from "../media";
import MediaQuestion from "./media-question";
import {SortElement} from "../question";

export enum QuestionTypes {
    Basic = "Basic",
    Quote = "Quote",
    Image = "Image",
    Hearing = "Hearing",
    Video = "Video",
    Choice = "Choice",
    Sort = "Sort",
    Guesstimate = "Guesstimate"
}

export enum SolutionTypes {
    Text = "Text",
    Image = "Image",
    List = "List"
}

type Question = {
    _id?: string;
    type: QuestionTypes;
    caption: string;
    topic: Topics;
    timeInSeconds: number;
    value: number;
    jokerReward?: Jokers;
    solution: string;
    solutionType: SolutionTypes,
    solutionArray?: string[],
    media?: Media;
    choices?: string[];
    sortElements?: SortElement[];
    unit?: string;
}

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