import { MongoClient, ServerApiVersion } from "mongodb";
const URL_START = useRuntimeConfig().private.MONGO_DB_URL_START;
const URL_END = useRuntimeConfig().private.MONGO_DB_URL_END;
const SECRET = useRuntimeConfig().private.MONGO_DB_PW;
const USER = useRuntimeConfig().private.MONGO_DB_USER;

const uri = URL_START + USER + ":" + SECRET + URL_END;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// export async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

export async function closeDatabase() {
  await client.close();
}

export const db = client.db("news-survey");
