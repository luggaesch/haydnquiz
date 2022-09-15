import {MediaTypes} from "../data/questions";

type Media = {
    _id?: string,
    type: MediaTypes,
    content?: string,
    sources?: string[]
}

export default Media;