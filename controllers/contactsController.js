import Contact from "../models/Contact.js";

//get all contacts
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

//create new contact
export const createNewContact = async (req, res) => {
  const contact = req.body;

  try {
    const newContact = await Contact.create({ ...contact });

    return res.status(200).json(newContact);
  } catch (error) {
    return res.status(500).json({ message: `faliure: ${error.message}` });
  }
};

//update contact
export const updateContact = async (req, res) => {
  const contact = req.body;

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      contact._id,
      {
        ...contact,
      },
      { returnOriginal: false }
    );

    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(400).json({ message: `faliure: ${error.message}` });
  }
};

//delete contact

export const deleteContact = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedContact = await Contact.findByIdAndDelete({ _id: id });

    return res.status(200).json(deletedContact);
  } catch (error) {
    return res.status(400).json({ message: `faliure: ${error.message}` });
  }
};
