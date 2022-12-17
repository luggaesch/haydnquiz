import Match from "./match";

export enum Jokers {
    "Wikipedia"= "Wikipedia",
    "DoubleDown" = "Doppelt oder Nichts",
    "Teamwork" = '"Teamwork"',
    "VierGewinnt" = "Vier Gewinnt",
    "Ueberfall" = "Hände Hoch",
    "Telefon" = "Call me maybe",
    "Lehrerliebling" = "Lehrerliebling"
}

type Joker = {
    _id?: string;
    name: Jokers;
    teamId: string;
    assignedQuestionId: string | undefined;
}

export function isJoker(joker: Joker | any): joker is Joker {
    return (joker as Joker).name !== undefined;
}

export default Joker;