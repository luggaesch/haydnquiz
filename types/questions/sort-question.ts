import Question, {QuestionSchema} from "./index";
import {z} from "zod";

export const SortElementSchema = z.object({
    name: z.string(),
    value: z.number()
})

export type SortElement = z.infer<typeof SortElementSchema>;

/*export const SortQuestionSchema = QuestionSchema.extend({
    sortElements: z.array(SortElementSchema),
    unit: z.string()
});

type SortQuestion = z.infer<typeof SortQuestionSchema>;

export default SortQuestion;
*/