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
  ticketAmount?: String;
  ticketPackage?:{
    packageName: String,
    packagePrice: String,
  };
  ticketDescription?: String;
}
