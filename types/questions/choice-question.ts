import Question, {QuestionSchema} from "./index";
import {z} from "zod";

export const ChoiceQuestionSchema = QuestionSchema.extend({
    choices: z.array(z.string())
})

type ChoiceQuestion = z.infer<typeof ChoiceQuestionSchema>;

export default ChoiceQuestion;