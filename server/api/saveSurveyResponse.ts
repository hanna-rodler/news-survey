import { connectToDatabase, db, closeDatabase } from "../surveyDatabase";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  const COLLECTION = useRuntimeConfig().env.MONGO_DB_SURVEY_COLLECTION;
  const body = await readBody(event);
  try {
    await connectToDatabase();
    const collection = db.collection(COLLECTION);
    const result = await collection.insertOne(body);
    return { message: "Data inserted successfully", result };
  } catch (error) {
    return {
      message: "Database connection failed!",
      error: error.message,
    };
  } finally {
    await closeDatabase();
  }
});
