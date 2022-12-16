import {
    Forest,
    Movie,
    MusicNote,
    Science,
    Public as Globe,
    People,
    LocalDining,
    AccountBalance, LibraryBooks, Translate, Sports, QuestionMark
} from "@mui/icons-material";
import {FaCalendar} from "react-icons/fa";

export enum Topics {
    "Nature" = "Natur",
    "PopCulture" = "Popkultur",
    "Music" = "Musik",
    "Science" = "Wissenschaft und Technik",
    "Geography" = "Geographie",
    "Society" = "Gesellschaft",
    "FoodAndDrinks" = "Essen und Trinken",
    "Finance" = "Finanzen und Mathematik",
    "History" = "Geschichte und Religion",
    "Literature" = "Literatur und Sprache",
    "Linguistics" = "Literatur und Sprache",
    "Sports" = "Sport",
    "Mystery" = "Mystery"
}

const imagePath = "images"

export function getIconByTopic(topic: Topics) {
    switch (topic) {
        case Topics.Nature:
            return Forest;
        case Topics.Music:
            return MusicNote;
        case Topics.PopCulture:
            return Movie;
        case Topics.Science:
            return Science;
        case Topics.Geography:
            return Globe;
        case Topics.Society:
            return People;
        case Topics.FoodAndDrinks:
            return LocalDining;
        case Topics.Finance:
            return AccountBalance;
        case Topics.History:
            return FaCalendar;
        case Topics.Literature:
            return LibraryBooks;
        case Topics.Linguistics:
            return Translate;
        case Topics.Sports:
            return Sports;
        case Topics.Mystery:
            return QuestionMark;
    }
}

export function getColorByTopic(topic: Topics) {
    switch (topic) {
        case Topics.Nature:
            return "#4cba8d";
        case Topics.Music:
            return "#5c62d3";
        case Topics.PopCulture:
            return "#ca8f5d";
        case Topics.Science:
            return "#315dce";
        case Topics.Geography:
            return "#80d051";
        case Topics.Society:
            return "#FFD5C2";
        case Topics.FoodAndDrinks:
            return "#d05151"
        case Topics.Finance:
            return "#d3bc65"
        case Topics.History:
            return "#51d0c5"
        case Topics.Literature:
            return "#8a2cd8"
        case Topics.Linguistics:
            return "#bc2ad3";
        case Topics.Sports:
            return "#b2c3c0"
        case Topics.Mystery:
            return "#ffe389"
    }
}

export function getBackgroundByTopic(topic: Topics) {
    switch (topic) {
        case Topics.Nature:
            return `${imagePath}/nature.jpg`;
        case Topics.Music:
            return `${imagePath}/music.png`;
        case Topics.PopCulture:
            return `${imagePath}/movies.jpg`;
    }
}
