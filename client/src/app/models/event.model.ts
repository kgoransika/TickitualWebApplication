export class Event {
  id?: any;
  createdBy?: String;
  eventName?: String;
  eventMode?: String;
  eventVenue?: String;
  eventOnlineMethod?: String;
  eventDate?: String;
  eventTime?: String;
  eventDuration?: String;
  eventCategory?: String;
  unlimitedTickets?: Boolean;
  ticketPackage?:{
    ticketAmount?: String;
    packageName: String,
    packagePrice: String,
  };
  ticketDescription?: String;
  published?: Boolean;
}
