const db = require("../models");
const Event = db.events;

// Create and Save a new event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.eventName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a event
  const event = new Event({
    eventName: req.body.eventName,
    eventMode: req.body.eventMode,
    eventVenue: req.body.eventVenue,
    eventOnlineMethod: req.body.eventOnlineMethod,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    eventDuration: req.body.eventDuration,
    ticketAmount: req.body.ticketAmount,
    ticketPackage: {
      packageName: req.body.ticketPackage.packageName,
      packagePrice: req.body.ticketPackage.packagePrice,
    },
    ticketDescription: req.body.ticketDescription,
  });

  // Save Event in the database
  event
    .save(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    });
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Event with an id
exports.findOne = (req, res) => {
  
};

// Update a Event by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Events
exports.findAllPublished = (req, res) => {
  
};