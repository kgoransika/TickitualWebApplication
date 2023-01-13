import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service';
import { UserService } from '../_services/user.service';
import { Event } from 'src/app/models/event.model';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board-event-holder',
  templateUrl: './board-event-holder.component.html',
  styleUrls: ['./board-event-holder.component.css']
})
export class BoardEventHolderComponent implements OnInit {

  content?: string;
  events?: Event[];
  createdBy = '';
  username: any;

  constructor(private userService: UserService, private eventService: EventService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.reloadPage();
    this.searchTitle();
    this.userService.getEventHolderBoard().subscribe({
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

  retrieveEvents(): void {
    this.eventService.getAll()
      .subscribe({
        next: (data) => {
          this.events = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {

    const user = this.storageService.getUser();
    this.username = user.username;
    this.eventService.findByCreatedBy(this.username)
      .subscribe({
        next: (data) => {
          this.events = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  reloadPage() {
    // this.location.reload();
    this.router.navigateByUrl(this.router.url);
  }
}
