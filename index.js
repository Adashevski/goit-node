import { listContacts } from "./controllers/contacts/listContacts.js";
import { getContactById } from "./controllers/contacts/getContactsById.js";
import { addContact } from "./controllers/contacts/addContacts.js";
import { removeContact } from "./controllers/contacts/removeContacts.js";
import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action (list, get, add, remove)")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
