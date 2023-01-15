import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';
import { StorageService } from 'src/app/_services/storage.service';
import { BoardEventHolderComponent } from '../board-event-holder.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {

  username?: string;
  durationInSeconds = 5;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  form: any = {
    eventName: null,
  };

  event: Event = {
    createdBy: this.username,
    eventName: '',
    eventMode: '',
    eventVenue: '',
    eventOnlineMethod: '',
    eventDate: '',
    eventTime: '',
    eventDuration: '',
    eventCategory: '',
    unlimitedTickets: false,
    ticketAmount: '',
    ticketPackage: {
      packageName: '',
      packagePrice: ''
    },
    ticketDescription: '',
  };
  submitted = false

  constructor(private eventService: EventService, private storageService: StorageService, private router: Router, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 5000,
    });
 }

  ngOnInit(): void {
    const user = this.storageService.getUser();
      this.username = user.username;
  }

  saveEvent(): void {
    const data = {
      createdBy: this.username,
      eventName: this.event.eventName,
      eventMode: this.eventMode,
      eventVenue: this.event.eventVenue,
      eventOnlineMethod: this.event.eventOnlineMethod,
      eventDate: this.event.eventDate,
      eventTime: this.event.eventTime,
      eventDuration: this.event.eventDuration,
      eventCategory: this.eventCategory,
      unlimitedTickets: this.event.unlimitedTickets,
      ticketAmount: this.event.ticketAmount,
      ticketPackage: {
        packageName: this.event.ticketPackage?.packageName,
        packagePrice: this.event.ticketPackage?.packagePrice,
      },
      ticketDescription: this.event.ticketDescription,
    };

    this.eventService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.router.navigate(['/eventHolder']);
          this.openSnackBar('Your Event was created successfully!', 'OK');
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.submitted = false;
        }
      });


  }

  /* newEvent(): void {
    this.submitted = false;
    this.event = {
      eventName: this.event.eventName,
      eventMode: this.event.eventMode,
      eventVenue: this.event.eventVenue,
      eventOnlineMethod: this.event.eventOnlineMethod,
      eventDate: this.event.eventDate,
      eventTime: this.event.eventTime,
      eventDuration: this.event.eventDuration,
      eventCategory: this.event.eventCategory,
      unlimitedTickets: this.event.unlimitedTickets,
      ticketAmount: this.event.ticketAmount,
      ticketPackage: {
        packageName: this.event.ticketPackage.packageName,
        packagePrice: this.event.ticketPackage.packagePrice
      },
      ticketDescription: this.event.ticketDescription,
    };
  } */

  eventMode: string | undefined;
  eventModes: string[] = ['Venue Event', 'Online Event'];

  ticketNumberType: string | undefined;
  ticketNumberTypes: string[] = ['Allocate specific number of tickets', 'Unlimited Tickets'];

  eventCategory: String | undefined;
  eventCategories = [
    {value: 'music', name: 'Musical Event'},
    {value: 'business', name: 'Business Event'},
    {value: 'sports', name: 'Sports Event'},
    {value: 'education', name: 'Educational Event'},
    {value: 'friendsAndFamily', name: 'Friends and Family Event'},
    {value: 'entertainment', name: 'Entertainment'},
    {value: 'foodAndDrink', name: 'Food and Drink'},
    {value: 'religion', name: 'Religious Event'},
    {value: 'science', name: 'Science Event'},
    {value: 'tech', name: 'Tech Event'},
    {value: 'socialMedia', name: 'Social Media Event'}
  ]
  //make the seatcheck div false
  unlimitedTicketsTxt = false;

  public packages: any[] = [{
    packageName: '',
    price: ''
  }];

  addPackage() {
    this.packages.push({
      id: this.packages.length + 1,
      packageName: '',
      price: '',
    });
  }

  removePackage(i: number) {
    this.packages.splice(i, 1);
  }
}
