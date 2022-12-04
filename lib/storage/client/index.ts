import { BlobServiceClient } from "@azure/storage-blob";

const account = "haydnquiz";
const sas = "sp=r&st=2022-12-03T12:56:16Z&se=2023-02-01T20:56:16Z&spr=https&sv=2021-06-08&sr=c&sig=ujK8if%2FpmdGWocQ2QTVYpIntenR8RvIuBGeYgtzt3sk%3D";

const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);

export default blobServiceClient;