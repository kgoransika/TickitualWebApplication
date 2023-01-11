module.exports = mongoose => {
  const Event = mongoose.model(
    "event",
    mongoose.Schema(
      {
        eventName: String,
        eventMode:['Venue Event','Online Event'],
        eventVenue: String,
        eventOnlineMethod: String,
        eventDate: String,
        eventTime: String,
        eventDuration: String,
        eventCategory: String,
        unlimitedTickets: Boolean,
        ticketAmount: String,
        ticketPackage: {
          packageName: String,
          packagePrice: String,
        },
        ticketDescription: String,
    },
      { timestamps: true }
    )
  );

  return Event;
};


  