import Question from "./index";
import Media from "../media";

type MediaQuestion = Question & {
    media: Media;
}

export default MediaQuestion;