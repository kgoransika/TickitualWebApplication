import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorStatus: String | undefined;
  message: String | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.errorStatus = this.route.snapshot.queryParams['status'];
    this.message = this.route.snapshot.queryParams['message'];
  }

}
