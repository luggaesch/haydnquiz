import {z} from "zod";
import {TeamSchema} from "./team";

export const QuizEventSchema = z.object({
    _id: z.string().optional(),
    owner: z.string(),
    name: z.string(),
    quizId: z.string(),
    teams: z.array(TeamSchema),
    availableDays: z.array(z.string()),
    selectedDaysByTeamId: z.array(z.object({
        teamId: z.string(),
        days: z.array(z.string())
    }))
});

type QuizEvent = z.infer<typeof QuizEventSchema>;

export default QuizEvent;