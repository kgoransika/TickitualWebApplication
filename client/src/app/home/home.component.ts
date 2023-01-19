import { Component, OnInit, Inject  } from '@angular/core';
import { DataService } from '../_services/data.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { EventService } from '../_services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  data: any;
  eventId: string;
  events?: Event[];
  username: any;

  constructor(private userService: UserService, private dataService: DataService, private route: ActivatedRoute, private eventService: EventService, private storageService: StorageService, private router: Router) {
    this.data = this.dataService.getData();
    this.eventId = this.route.snapshot.paramMap.get('id')|| "";
  }

  ngOnInit(): void {
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

  searchId(): void {

    const user = this.storageService.getUser();
    this.username = user.username;
    this.eventService.findByCreatedBy(this.username)
      .subscribe({
        next: (data) => {
          this.events = data;
          console.log(data);
          const event = data.filter(e => e._id === this.eventId && e.published === true);
          if(event.length === 0){
            console.log("No event found with id: ",this.eventId);
            this.router.navigate(['/error'], { state: { error: { message: 'Event not found', id: this.eventId } } });
            }
          console.log(event[0]);
        },
        error: (e) => console.error(e)
      });
      /* const event = data.filter(events => events.id === this.eventId)[0];
        console.log(user.eventName) */
  }
}
