import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  eventType: string | undefined;
  eventTypes: string[] = ['Venue Event', 'Online Event'];

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
