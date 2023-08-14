import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import mongoose from "mongoose";
import Contact from "./models/Contact.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

//set up port

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("database is up and running");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

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

//get contacts
app.get("/api/contacts/all", (req, res) => {
  if (contacts) {
    return res.status(200).json(contacts);
  } else {
    return res.status(404).json({ message: "contacts not found" });
  }
});

//get single contact
app.get("/api/contacts/:id", (req, res) => {
  const contactID = req.params.id;

  // console.log(contactID);
  const contact = findContact(contactID);

  if (contact) {
    return res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "contact not found" });
  }
});

const findContact = (contactID) => {
  //const contactsCopy = [...contacts];
  const contact = contacts.find((contact) => contact.id == contactID);
  //contact && console.log(contact);
  return contact;
};

//create new contact
app.post("/api/contacts/new", (req, res) => {
  const { name, email, phone, address } = req.body;
  //validate input
  if (!name || !email || !phone || !address)
    res.status(400).json({ message: "All contact fields are required" });

  //create new contact
  const newContact = {
    //id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
    address: address,
  };

  const saveToDB = async () => {
    const mongodbcon = await Contact.create({ ...newContact });

    if (mongodbcon) {
      contacts.push(newContact);

      return res.status(200).json(newContact);
    }

    res.status(500).json({ message: "failed to save new contact to the db" });
  };

  saveToDB();
});

//update contact
app.patch(`/api/contacts/:id/`, (req, res) => {
  const contactID = req.params.id;

  const exists = contacts.find((contact) => contact.id == contactID);

  if (exists) {
    const updatedContact = req.body;

    const contactIndex = contacts.findIndex(
      (contact) => contact.id == contactID
    );

    if ((contacts[contactIndex] = { id: contactID, ...updatedContact }))
      res.status(200).json(contacts[contactIndex]);

    return res.status(500).json({ message: "Update failed" });
  }

  return res.status(404).json({
    message: `update failed, contact with id: ${contactID} does not exist`,
  });
});

//delete contact
app.delete("/api/contacts/:id/", (req, res) => {
  const contactID = req.params.id;

  const exists = contacts.find((contact) => contact.id == contactID);

  if (exists) {
    const contactIndex = contacts.findIndex(
      (contact) => contact.id == contactID
    );

    //contacts = newContacts;
    const deleted = contacts.splice(contactIndex, 1);
    return res.status(200).json(contacts);
  }

  return res.status(404).json({ message: "that contact does not exist" });
});
