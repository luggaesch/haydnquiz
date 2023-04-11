import {z} from "zod";
import {QuestionSchema} from "./questions";

export const QuizSchema = z.object({
    _id: z.string().optional(),
    name: z.string(),
    owner: z.string(),
    questions: z.array(QuestionSchema),
    stops: z.array(z.number().gte(1))
});

type Quiz = z.infer<typeof QuizSchema>;

export function isQuiz(quiz: Quiz | any): quiz is Quiz {
    return QuizSchema.safeParse(quiz).success;
}

export default Quiz;