import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    });
    console.log("Connected to database.");
  } catch (err) {
    console.log(`Some Error occured. ${err}`);
  }
};
