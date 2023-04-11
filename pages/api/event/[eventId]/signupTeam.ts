import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]";
import connectMongo from "../../../../lib/db/connectMongo";
import {QuizEventModel, TeamModel} from "../../../../lib/db/models";
import {z} from "zod";

export const TeamSignupRequestSchema = z.object({
    name: z.string(),
    color: z.string(),
    players: z.array(z.string()),
    selectedDays: z.array(z.string())
});

export type TeamSignupRequest = z.infer<typeof TeamSignupRequestSchema>;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const requestBody: z.infer<typeof TeamSignupRequestSchema> = req.body;
        if (!TeamSignupRequestSchema.safeParse(requestBody).success) {
            res.status(500).send("Malformed Request");
        }
        const { eventId } = req.query;
        const { name, color, selectedDays, players } = requestBody;
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) {
            res.status(403).send("Access to requested resource prohibited.");
            return;
        }
        await connectMongo;
        const team = await TeamModel.create({ name, color, players, user: session.user.id });
        const event = await QuizEventModel.findOne({ _id: eventId }).populate("teams");
        event.teams.push(team);
        event.selectedDaysByTeamId.push({ teamId: team._id!, days: selectedDays });
        event.save();
        res.send(JSON.stringify(event));
    } else {
        res.status(404).send({});
    }
}