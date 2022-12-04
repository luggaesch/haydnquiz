import {BlobServiceClient} from "@azure/storage-blob";
import {v4} from "uuid";

/*const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!account) throw Error('Azure Storage accountName not found');
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    defaultAzureCredential,
);*/

// TODO: Create API for this, do not expose to frontend
const AZURE_STORAGE_CONNECTION_STRING = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) throw Error("No Connection String");

// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
);

const containerName = "audio";
const containerClient = blobServiceClient.getContainerClient(containerName);

export async function getContainerClient() {
    const res = await containerClient.createIfNotExists();
    return containerClient;
}



export default blobServiceClient;