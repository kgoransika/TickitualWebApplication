module.exports = app => {
    const events = require("../controllers/event.controller.js");
  
    var router = require("express").Router();
  
    // Create a new event
    router.post("/", events.create);
  
    // Retrieve all events
    router.get("/", events.findAll);
  
    // Retrieve all published events
    router.get("/published", events.findAllPublished);
  
    // Retrieve a single event with id
    router.get("/:id", events.findOne);
  
    /* // Update a event with id
    router.put("/:id", events.update); */

    // Update published and shareLink
    router.put("/:id", events.updatePublsihed);
    
    // Delete a event with id
    router.delete("/:id", events.delete);
  
    // Delete all events
    router.delete("/", events.deleteAll);
  
    app.use('/api/events', router);
  };