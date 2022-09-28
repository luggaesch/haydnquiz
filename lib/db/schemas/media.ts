import mongoose from "mongoose";
import {MediaTypes} from "../../../types/media";

const MediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: MediaTypes,
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