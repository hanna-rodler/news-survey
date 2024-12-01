import { connectToDatabase, db, closeDatabase } from "../../server/database";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    // await run();
    await connectToDatabase();
    const collection = db.collection("news-survey");
    const result = await collection.insertOne(body);
    return { message: "Data inserted successfully", result };
  } catch (error) {
    return {
      message: "Database connection test failed!",
      error: error.message,
    };
  } finally {
    await closeDatabase();
  }
});
