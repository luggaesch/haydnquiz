import {z} from "zod";
import {TeamSchema} from "./team";

export const QuizEventSchema = z.object({
    _id: z.string().optional(),
    owner: z.string(),
    name: z.string(),
    description: z.string(),
    quizId: z.string(),
    teams: z.array(TeamSchema),
    solos: z.array(z.object({
        _id: z.string().optional(),
        name: z.string(),
        selectedDays: z.array(z.string())
    })),
    availableDays: z.array(z.string()),
    selectedDaysByTeamId: z.array(z.object({
        teamId: z.string(),
        days: z.array(z.string())
    }))
});

type QuizEvent = z.infer<typeof QuizEventSchema>;

export default QuizEvent;