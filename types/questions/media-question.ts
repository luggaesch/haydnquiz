import Question, {QuestionSchema} from "./index";
import Media, {MediaSchema} from "../media";
import {z} from "zod";

export const MediaQuestionSchema = QuestionSchema.extend({
    media: MediaSchema
})

type MediaQuestion = z.infer<typeof MediaQuestionSchema>;

export default MediaQuestion;