import { connectToDatabase, db, closeDatabase } from "../registrationDatabase";
import { readBody } from "h3";
const COLLECTION = useRuntimeConfig().private.MONGO_DB_REGISTRATION_COLLECTION;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    console.log("body", body);
    await connectToDatabase();
    const collection = db.collection(COLLECTION);
    const result = await collection.insertOne(body);
    return { message: "Data inserted successfully", result };
  } catch (error) {
    console.error("registration", error);
    return { message: error };
  } finally {
    await closeDatabase();
  }
});
