import {MediaType} from "../../../data/questions";
import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: MediaType,
        required: true
    },
    content: {
        type: String
    },
    sources: [
        {
            type: String
        }
    ]
});

export default MediaSchema;