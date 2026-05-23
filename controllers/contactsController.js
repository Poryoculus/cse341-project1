const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const boduyParser = require("body-parser");

const getAllContacts = async (req, res) => {
  //#Swagger.tags = ["Contacts"]
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getContactById = async (req, res) => {
  //#Swagger.tags = ["Contacts"]

  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  //#Swagger.tags = ["Contacts"]

  const contact = {
    firstName: req.body.FirstName,
    lastName: req.body.LastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact.",
      );
  }
};

const updateContact = async (req, res) => {
  //#Swagger.tags = ["Contacts"]

  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.FirstName,
    lastName: req.body.LastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact.",
      );
  }
};

const deleteContact = async (req, res) => {
  //#Swagger.tags = ["Contacts"]

  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact.",
      );
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  updateContact,
  createContact,
  deleteContact,
};
