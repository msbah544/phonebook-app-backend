import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import Contact from "./models/Contact.js";
import { connectToDB } from "./utils/database.js";
import { getContacts } from "./controllers/contactsController.js";
import router from "./routes/router.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

//set up port

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

await connectToDB();

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

//ROUTES

const contacts = [
  {
    id: 1,
    name: "Omar Jasseh",
    email: "omar@jassehcodecamp.com",
    phone: 3100948,
    address: "Sanchaba",
  },

  {
    id: 2,
    name: "Buba Conteh",
    email: "buba@jassehcodecamp.com",
    phone: 3104015,
    address: "Bakoteh",
  },
];
//const contacts = null;

app.use("/api/contacts", router);
