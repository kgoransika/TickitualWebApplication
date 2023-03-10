const db = require("../models");
const Event = db.events;

// Create and Save a new event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.eventName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.eventMode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.eventVenue) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.eventDate) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.eventTime) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.eventDuration) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.ticketPackage.packageName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.ticketPackage.packagePrice) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.ticketDescription) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a event
  const event = new Event({
    createdBy: req.body.createdBy,
    eventName: req.body.eventName,
    eventMode: req.body.eventMode,
    eventVenue: req.body.eventVenue,
    eventOnlineMethod: req.body.eventOnlineMethod,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    eventDuration: req.body.eventDuration,
    eventCategory: req.body.eventCategory,
    unlimitedTickets: req.body.unlimitedTickets,
    ticketPackage: {
      ticketAmount: req.body.ticketPackage.ticketAmount,
      packageName: req.body.ticketPackage.packageName,
      packagePrice: req.body.ticketPackage.packagePrice,
    },
    ticketDescription: req.body.ticketDescription,
    published: false,
    shareLink: ''
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
   const createdBy = req.query.createdBy;
  var condition = createdBy ? { createdBy: { $regex: new RegExp(createdBy), $options: "i" } } : {};

  Event.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Event."
      });
    });
};

// Find a single Event with an username
exports.findOne = (req, res) => {
  const createdBy = req.params.createdBy;

  Event.findByCreatedBy(createdBy)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Event with createdBy " + createdBy });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Event with createdBy=" + createdBy });
    });
};

// Update a Event by the username in the request
/* exports.update = (req, res) => {
  
  Event.findById(req.params.id, (err, event) => {
    if(err) {
        return res.status(500).send(err);
    }
    if(!event){
        return res.status(404).send('Event not found');
    }
    event.set(req.body);
    event.save((error, updatedEvent) => {
        if(error) {
            return res.status(500).send(error);
        }
        return res.status(200).send(updatedEvent);
    });
});
}; */

// Update a Event's (published = true), (shareLink = 'localhost:8081/home/{username}/{eventId}}') by the id in the request
exports.updatePublsihed = (req, res) => {

  Event.findById(req.params.id, (err, event) => {
    if(err) {
        return res.status(500).send(err);
    }
    if(!event){
        return res.status(404).send('Event not found');
    }
    event.set(req.body);
    event.save((error, updatePublsihed) => {
        if(error) {
            return res.status(500).send(error);
        }
        return res.status(200).send(updatePublsihed);
    });
});
};

// Delete a Event with the specified username in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Event.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      } else {
        res.send({
          message: "Event was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Events
exports.findAllPublished = (req, res) => {
  
};