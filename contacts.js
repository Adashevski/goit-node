const path = require("path");
const fs = require("fs").promises;
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readDataFromFile() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

async function writeDataToFile(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.log(err.message);
  }
}

async function listContacts() {
  const contacts = await readDataFromFile();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await readDataFromFile();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    console.log(`There is no contact with id: ${contactId}`);
  } else {
    console.table([contact]);
  }
}
//
async function removeContact(contactId) {
  const contacts = await readDataFromFile();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  if (contacts.length === newContacts.length) {
    console.log(`There is no contact with id: ${contactId}`);
  } else {
    await writeDataToFile(newContacts);
    listContacts();
  }
}

async function addContact(name, email, phone) {
  const contacts = await readDataFromFile();

  if (
    contacts.find(
      (contact) =>
        contact.name.toLowerCase().replace(/\s/g, "") ===
        name.toLowerCase().replace(/\s/g, "")
    )
  ) {
    console.log(`Contact with name: ${name} is already in the database.`);
  } else if (
    contacts.find(
      (contact) =>
        contact.email.toLowerCase().replace(/\s/g, "") ===
        email.toLowerCase().replace(/\s/g, "")
    )
  ) {
    console.log(`Contact with email: ${email} is already in the database.`);
  } else if (
    contacts.find(
      (contact) =>
        contact.phone.toLowerCase().replace(/\s/g, "") ===
        phone.toLowerCase().replace(/\s/g, "")
    )
  ) {
    console.log(`Contact with phone: ${phone} is already in the database.`);
  } else {
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await writeDataToFile(contacts);
    listContacts();
  }
}