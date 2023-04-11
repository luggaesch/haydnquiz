import {QuestionSchema} from "./index";
import {z} from "zod";

export const CategorySchema = z.object({
    name: z.string(),
    items: z.array(z.string())
});

export type Category = z.infer<typeof CategorySchema>;

/* export const CategorizeQuestionSchema = QuestionSchema.extend({
    categories: z.array(CategorySchema)
})

type CategorizeQuestion = z.infer<typeof CategorizeQuestionSchema>;

export default CategorizeQuestion;
 */