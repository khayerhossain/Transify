import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
  applyRidersCollection: "applyRiders",
  newslatterSubscribersCollection: "subscribers",
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI in .env.local");
}

const uri = process.env.MONGODB_URI;

if (!clientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export default async function dbConnect(collectionName) {
  const conn = await clientPromise;
  return conn.db("transify").collection(collectionName);
}
