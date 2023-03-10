import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../_services/event.service';
import { UserService } from '../_services/user.service';
import { Event } from 'src/app/models/event.model';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataService } from '../_services/data.service';
import { ClipboardService } from 'ngx-clipboard';
import io  from 'socket.io-client';

@Component({
  selector: 'app-board-event-holder',
  templateUrl: './board-event-holder.component.html',
  styleUrls: ['./board-event-holder.component.css']
})
export class BoardEventHolderComponent implements OnInit, OnDestroy {

  tickets = 0;
  clients = 0;
  socket: any;

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  content?: string;
  events?: Event[];
  createdBy = '';
  username: any;
  showDivFlag: String | undefined;
  showDivFlags: String[] = ['true' , 'false'];
  dataSet = [];
  dataValues = [];
  items: any;
  public sharelink: any;
  id: any;
  shareLink: any = {};
  published: any = {};

  @Input() currentEvent: Event = {
    _id: '',
    published: false
  };
  message = '';
showHint: any;
  constructor(private userService: UserService, private eventService: EventService, private storageService: StorageService, private router: Router, private _snackBar: MatSnackBar, private dataService: DataService, private _clipboardService: ClipboardService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
       duration: 5000,
    });
 }
  ngOnInit(): void {

    this.socket = io('http://localhost:8080');
    this.socket.emit('home-view');
    this.socket.on('clients', (data: number) => {
      this.clients = data;
    });
    this.socket.on('tickets', (data: number) => {
      this.tickets = data;
    });

    this.displayEvents()
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

  ngOnDestroy() {
    /* this.socket = io('http://localhost:8080');
    this.socket.emit('disconnect');
    this.socket.disconnect(); */
}

  copy(text: string){
    this._clipboardService.copy(text)
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
          if(data.length > 0){
            this.showDivFlag = 'true';
            this.reloadPage
          }
          else{
            this.showDivFlag = 'false';
          }
        },
        error: (e) => console.error(e)
      });
  }

  reloadPage() {
    // this.location.reload();
    this.router.navigateByUrl(this.router.url);
  }

  displayEvents(){
    const user = this.storageService.getUser();
    this.username = user.username;
    this.items = this.eventService.findEvent(this.username).pipe(tap(data => console.log(data)));
    console.log(this.username)
  }

  editEvent(){
    alert("Edit events is still under development!")
  }

  deleteEvent(id: any): void {
    this.eventService.findByIdAndRemove(id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
      window.location.reload();
  }

  publishEvent(id: any): void {

    this.currentEvent._id = this.eventService.get(id);
    this.dataService.setData(id);
    this.sharelink = "home/"+this.username+"/"+id+""
    this.eventService.findByIdAndUpdate(id, 'true', this.sharelink)
    .subscribe({
      next: (res) => {
        console.log(`Publish Status of Event with id ${id} updated`)
        console.log(res);
      },
      error: (e) => console.error(e)
    });
    this.openSnackBar('Your Event is Published successfully!', 'OK');
    window.location.reload();
    /* this.router.navigate([`/home/${this.username}/${id}`]); */
  }

  previewEvent(getLink: any): void{

    this.router.navigate([getLink]);
  }

  shareEvent(textToCopy:any):void{
    this.openSnackBar('Event Link copied to Clipboard! '+textToCopy , 'OK');
  }

}

