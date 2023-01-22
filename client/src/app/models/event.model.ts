export class Event {
  static createdBy: string;
  static filter(arg0: (createdBy: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  _id?: any;
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
  shareLink?: String;
}
