const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contactsController");

router.get("/contacts", contactsController.getAllContacts);

router.get("/contacts/:id", contactsController.getContactById);

router.post("/contacts", contactsController.createContact);

router.put("/contacts/:id", contactsController.updateContact);

router.delete("/contacts/:id", contactsController.deleteContact);

module.exports = router;
