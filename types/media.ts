import {MediaType} from "../data/questions";

type Media = {
    _id?: string,
    type: MediaType,
    content?: string,
    sources?: string[]
}

export default Media;