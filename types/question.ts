import {Topics} from "../data/topics";
import {Joker} from "../data/jokers";
import Media from "./media";
import {FormatQuote, Hearing, Image, Numbers, Sort, TextSnippet, VideoLibrary} from "@mui/icons-material";
import {List} from "@rsuite/icons";

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

type Question = {
    _id?: string;
    type: QuestionTypes;
    caption: string;
    topic: Topics;
    timeInSeconds: number;
    value: number;
    jokerReward?: Joker;
    solution: string;
    solutionIsUrl?: boolean;
    solutionArray?: string[];
    media?: Media;
    choices?: string[];
    sortElements?: { name: string, value: number }[];
    unit?: string;
}

export default Question;

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
            return List;
        case QuestionTypes.Sort:
            return Sort;
        case QuestionTypes.Guesstimate:
            return Numbers;
    }
}