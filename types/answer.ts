import {z} from "zod";

export const AnswerSchema = z.object({
    _id: z.string().optional(),
    teamId: z.string(),
    questionId: z.string(),
    values: z.array(z.string()),
    points: z.number()
});

type Answer = z.infer<typeof AnswerSchema>;

export default Answer;
