import { Client, Databases, Storage } from "appwrite";

// const projectId = process.env.NEXT_PUBLIC_projectId;
// const storageId = process.env.NEXT_PUBLIC_storageId;
// const databaseId = process.env.NEXT_PUBLIC_databaseId;
// const messageCollectionId = process.env.NEXT_PUBLIC_messageCollectionId;
// const dataCollectionId = process.env.NEXT_PUBLIC_dataCollectionId;
// const marketingCollectionId = process.env.NEXT_PUBLIC_marketingCollectionId;
// const ip = process.env.NEXT_PUBLIC_ip;

const projectId = "66711c60001bf88c0038";
const storageId = "66711ed3002f45339c06";
const databaseId = "6671203200286f104457";
const messageCollectionId = "667122ab000acc985253";
const dataCollectionId = "6673c4c0001d395a2a1f";
const marketingCollectionId = "6677f0890000b7e41c67";
const ip = "https://cloud.appwrite.io/v1";

const client = new Client();

client.setEndpoint(ip).setProject(projectId);

const database = new Databases(client);

const storage = new Storage(client);

export {
  client,
  database,
  storage,
  projectId,
  databaseId,
  dataCollectionId,
  messageCollectionId,
  storageId,
  marketingCollectionId,
  ip,
};
