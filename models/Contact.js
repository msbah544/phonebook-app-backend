import { model, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);

export default Contact;
