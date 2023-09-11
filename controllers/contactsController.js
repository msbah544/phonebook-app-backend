import Contact from "../models/Contact.js";

//get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: `faliure:${error.message}` });
  }
};

//get single contact
export const getContactByID = async (req, res) => {
  const contactID = req.params.id;

  try {
    const contact = await Contact.findById(contactID);
    if (contact) {
      return res.status(200).json(contact);
    }
    return res
      .status(404)
      .json({ message: `faliure: contact with id:${contactID} doesn't exist` });
  } catch (error) {
    return res.status(404).json({ error: `faliure: ${error.message}` });
  }
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
    const exists = await Contact.findById(id);
    if (exists) {
      const deletedContact = await Contact.findOneAndDelete({ _id: id });

      return res.status(200).json(deletedContact);
    }
    return res
      .status(404)
      .json({ message: `faliure: contact with id:${id} doesn't exist` });
  } catch (error) {
    return res.status(400).json({ message: `faliure: ${error.message}` });
  }
};
