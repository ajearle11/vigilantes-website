import { MongoClient } from "mongodb";

// Ensure the environment variable is set
if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

const uri = process.env.MONGODB_URI;
const options = {};

// Add custom type to NodeJS.Global for _mongoClientPromise
declare global {
  // Allow setting this global variable in development
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Initialize cached client and client promise
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use global variable to preserve connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
