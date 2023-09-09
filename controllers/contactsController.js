import Contact from "../models/Contact.js";

export const getContacts = async (req, res) => {
  const contacts = await Contact.find({});

  if (contacts) {
    return res.status(200).json(contacts);
  } else {
    return res.status(500).json({ message: "contacts not found" });
  }
};

//get single contact
export const getContactByID = async (req, res) => {
  const contactID = req.params.id;

  const contact = await Contact.findById(contactID);

  if (!contact) {
    return res.status(404).json({ error: "contact not founs" });
  }
  return res.status(200).json(contact);
};
