import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("database is up and running");
      return true;
    })
    .catch((err) => {
      console.log(err.message);
      return false;
    });
};
