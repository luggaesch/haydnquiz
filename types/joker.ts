import Match from "./match";
import {z} from "zod";

export enum Jokers {
    "Wikipedia"= "Wikipedia",
    "DoubleDown" = "Doppelt oder Nichts",
    "Teamwork" = '"Teamwork"',
    "VierGewinnt" = "Vier Gewinnt",
    "Ueberfall" = "Hände Hoch",
    "Telefon" = "Call me maybe",
    "Lehrerliebling" = "Lehrerliebling"
}

export const JokerSchema = z.object({
    _id: z.string().optional(),
    name: z.nativeEnum(Jokers),
    teamId: z.string(),
    assignedQuestionId: z.string().optional()
});



type Joker = z.infer<typeof JokerSchema>;

export function isJoker(joker: Joker | any): joker is Joker {
    return JokerSchema.safeParse(joker).success;
}

export default Joker;