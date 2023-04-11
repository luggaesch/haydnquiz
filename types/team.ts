import {Topics} from "../data/topics";
import {z} from "zod";

export const AvailableColors = [
    "#d09151", "#5175d0", "#c855ef", "#64926e",
    "#d0b751", "#b2c3c0", "#d05151", "#51c5d0",
    "#51d053", "#7151d0", "#7adf3f", "#92aae6"
]

export const TeamSchema = z.object({
    _id: z.string().optional(),
    user: z.string(),
    name: z.string(),
    color: z.string(),
    players: z.array(z.string()),
    selectedTopic: z.nativeEnum(Topics).optional()
})

type Team = z.infer<typeof TeamSchema>;

export default Team;
