import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./utils/database.js";
import contactRoutes from "./routes/contact.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());

//connect to DB
await connectToDB();

//set up port

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

//ROUTES

app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);
