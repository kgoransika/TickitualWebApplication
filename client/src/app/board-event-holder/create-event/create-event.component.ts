import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';
import { StorageService } from 'src/app/_services/storage.service';
import { BoardEventHolderComponent } from '../board-event-holder.component';

interface Category {
  value: string;
  viewValue: string;
}

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
    eventMode: {
      enum: ['Venue Event', 'Online Event']
    },
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

  categories: Category[] = [
    {value: 'music-0', viewValue: 'Musical Event'},
    {value: 'business-1', viewValue: 'Business Event'},
    {value: 'sports-2', viewValue: 'Sports Event'},
    {value: 'education-3', viewValue: 'Educational Event'},
    {value: 'friendsAndFamily-4', viewValue: 'Friends and Family Event'},
    {value: 'entertainment-5', viewValue: 'Entertainment'},
    {value: 'foodAndDrink-6', viewValue: 'Food and Drink'},
    {value: 'religion-7', viewValue: 'Religious Event'},
    {value: 'science-8', viewValue: 'Science Event'},
    {value: 'tech-9', viewValue: 'Tech Event'},
    {value: 'socialMedia-10', viewValue: 'Social Media Event'}
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
