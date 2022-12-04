import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {getContainerClient} from "../../../lib/storage/server/";
import {v1} from "uuid";
import nextConnect from "next-connect";
import multer from "multer";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).send("Error");
    },
    onNoMatch(req, res) {
        res.status(405).send("Method not allowed");
    }
});

apiRoute.use(multer().any());

apiRoute.post(async (req: NextApiRequest & { files: any[] }, res) => {
    const file = req.files[0];
    const blobName = v1() + ".mp3";
    const blockBlobClient = (await getContainerClient()).getBlockBlobClient(blobName);
    console.log(file.buffer);
    const uploadRes = await blockBlobClient.upload(file.buffer.toString(), file.size);
    console.log(uploadRes);
    res.status(200).send(blobName);
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    }
}



/*
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const data: FormData = req.body;
        console.log(data);
        await connectMongo;
        const blobName = "test.mp3";
        const blockBlobClient = (await getContainerClient()).getBlockBlobClient(blobName);
        const blob = data.get("audio");
        if (!blob) {
            res.status(400).send("No File");
            return;
        }
        const uploadRes = await blockBlobClient.upload(blob, blob.toString().length);
        console.log(uploadRes);
        res.status(200).send("OK");
    } else {
        res.status(404).send({});
    }
}*/
