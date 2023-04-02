const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(contact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
