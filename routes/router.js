import express from "express";
import {
  getContactByID,
  getContacts,
} from "../controllers/contactsController.js";

const router = express.Router();

router.get("/", getContacts);

router.get("/:id", getContactByID);

export default router;
