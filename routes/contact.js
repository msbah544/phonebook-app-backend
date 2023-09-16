import express from "express";
import {
  createNewContact,
  deleteContact,
  getContactByID,
  getContacts,
  updateContact,
} from "../controllers/contactsController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getContacts);

router.get("/:id", getContactByID);

router.post("/", createNewContact);

router.patch("/", updateContact);

router.delete("/:id", deleteContact);

export default router;
