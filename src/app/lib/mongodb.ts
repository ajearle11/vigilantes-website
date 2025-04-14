import { MongoClient } from "mongodb";

// Ensure the environment variable is set
if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

const uri = process.env.MONGODB_URI;
const options = {};

// Properly type globalThis to avoid 'any'
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Prevent TS error on first access
globalThis._mongoClientPromise ||= undefined;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use cached connection in dev to avoid hot reload issues
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // Always create a new client in production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
