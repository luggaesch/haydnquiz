import {QuizSchema} from "./quiz";
import {TeamSchema} from "./team";
import {AnswerSchema} from "./answer";
import {JokerSchema} from "./joker";
import {z} from "zod";

export enum GamePhases {
    TopicSelection = -2,
    Introduction = -1,
    Playing,
    Transition,
    Solutions,
    Rankings,
}

export const MatchSchema = z.object({
    _id: z.string().optional(),
    user: z.string(),
    quiz: QuizSchema,
    teams: z.array(TeamSchema),
    answers: z.array(AnswerSchema),
    phase: z.nativeEnum(GamePhases),
    currentQuestionIndex: z.number().gte(0),
    startTime: z.string(),
    finished: z.boolean(),
    currentlyOpenUploadRound: z.number().gte(0),
    pastUploadRounds: z.array(z.number().gte(0)),
    jokers: z.array(JokerSchema)
})

type Match = z.infer<typeof MatchSchema>;

export function isMatch(match: Match | any): match is Match {
    return MatchSchema.safeParse(match).success;
}

export default Match;
