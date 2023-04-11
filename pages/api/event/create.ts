import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import connectMongo from "../../../lib/db/connectMongo";
import {QuizEventModel} from "../../../lib/db/models";
import {z} from "zod";

const RequestBody = z.object({
    name: z.string(),
    description: z.string(),
    quizId: z.string(),
    availableDays: z.array(z.date()),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const requestBody: z.infer<typeof RequestBody> = req.body;
        if (!RequestBody.safeParse(requestBody)) {
            res.status(500).send("Malformed Request");
        }
        const { name, description, quizId, availableDays } = requestBody;
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) {
            res.status(403).send("Access to requested resource prohibited.");
            return;
        }
        await connectMongo;
        const event = await QuizEventModel.create({ owner: session.user.id, name, description, quizId, availableDays });
        res.send(JSON.stringify(event));
    } else {
        res.status(404).send({});
    }
}