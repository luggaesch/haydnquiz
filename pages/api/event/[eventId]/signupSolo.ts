import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]";
import connectMongo from "../../../../lib/db/connectMongo";
import {QuizEventModel} from "../../../../lib/db/models";
import {z} from "zod";

export const SoloSignupRequestSchema = z.object({
    name: z.string(),
    selectedDays: z.array(z.string())
});

export type SoloSignupRequest = z.infer<typeof SoloSignupRequestSchema>;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const requestBody: z.infer<typeof SoloSignupRequestSchema> = req.body;
        if (!SoloSignupRequestSchema.safeParse(requestBody).success) {
            res.status(500).send("Malformed Request");
        }
        const { eventId } = req.query;
        const { name, selectedDays } = requestBody;
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) {
            res.status(403).send("Access to requested resource prohibited.");
            return;
        }
        await connectMongo;
        const event = await QuizEventModel.findOne({ _id: eventId }).populate("teams");
        event.solos.push({ name, selectedDays });
        event.save();
        res.send(JSON.stringify(event));
    } else {
        res.status(404).send({});
    }
}