import { Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { DataService } from '../_services/data.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { EventService } from '../_services/event.service';
import { Event } from 'src/app/models/event.model';
import { tap } from 'rxjs';
import io  from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  clients = 0;
  socket: any;
  content?: string;
  data: any;
  eventId: string;
  events?: Event[];
  username: any;
  items: any;
  bookingEnd: String | undefined;
  bookingEnds: String[] = ['true' , 'false'];

  private targetDate = new Date(); // set target date '2022-12-31T23:59:59'
  public days = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;

  constructor(private userService: UserService, private dataService: DataService, private route: ActivatedRoute, private eventService: EventService, private storageService: StorageService, private router: Router) {
    this.data = this.dataService.getData();
    this.username = this.route.snapshot.paramMap.get('username')|| "";
    this.eventId = this.route.snapshot.paramMap.get('id')|| "";
  }

  ngOnInit(): void {

    this.socket = io('http://localhost:8080');
    this.socket.emit('home-view');

    this.searchId();
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

  ngOnDestroy() {
    /* this.socket = io('http://localhost:8080');
    this.socket.emit('disconnect');
    this.socket.disconnect(); */
}

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  buyTicketIfExpired(){
    alert("Booking date is expired!")
  }

  searchId(): void {
    this.eventService.findByCreatedBy(this.username)
      .subscribe({
        next: (data) => {
          this.events = data;
          console.log(data);
          const event = data.filter(e => e._id === this.eventId && e.published === true);
          const date = event.filter(d => d.eventDate)
          console.log(date)
          if(event.length === 0){
            console.log("No event found with id: ",this.eventId);
            this.router.navigate(['/error'], { queryParams: { status: '404' , message: "No event found with id: "+this.eventId} });
            }
          console.log(event);
          this.items = event;
          console.log(event[0].eventDate);

          const eventDate = event[0].eventDate
          const dateTime = ""+eventDate

          let eventDateResult : Date = new Date(dateTime);
          this.targetDate = eventDateResult;

          setInterval(() => {
            const currentDate = new Date();
            const timeRemaining = this.targetDate.getTime() - currentDate.getTime();

            if(currentDate > eventDateResult){
              this.bookingEnd = 'true';
            }
            else{
              this.bookingEnd = 'false';
            }

            this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          }, 1000);

        },
        error: (e) => console.error(e)
      });
      /* const event = data.filter(events => events.id === this.eventId)[0];
        console.log(user.eventName) */
  }

  displayEvents(){
    this.items = this.eventService.findEvent(this.username).pipe(tap(data => console.log(data)));
    console.log(this.username)
  }

}
