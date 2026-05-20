const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contactsController");

router.get("/contacts", contactsController.getAllContacts);

router.get("/contacts/:id", contactsController.getContactById);

module.exports = router;
