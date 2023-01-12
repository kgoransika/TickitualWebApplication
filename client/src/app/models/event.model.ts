export class Event {
  id?: any;
  createdBy?: String;
  eventName?: String;
  eventMode?: {
    type?: String,
    enum?: ['Venue Event','Online Event'],
    required?: true
  };
  eventVenue?: String;
  eventOnlineMethod?: String;
  eventDate?: String;
  eventTime?: String;
  eventDuration?: String;
  eventCategory?: String;
  unlimitedTickets?: Boolean;
  ticketAmount?: String;
  ticketPackage?:{
    packageName: String,
    packagePrice: String,
  };
  ticketDescription?: String;
}
