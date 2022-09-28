import {MediaTypes} from "../data/questions";

export interface MediaInterface {
    _id?: string,
    type: MediaTypes,
    content?: string,
    sources?: string[]
}

type Media = {
    _id?: string,
    type: MediaTypes,
    content?: string,
    sources?: string[]
}

export default Media;