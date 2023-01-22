import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Event } from '../models/event.model';
import { StorageService } from './storage.service';

const baseUrl = 'http://localhost:8080/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  username: any;
  db: any;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  ngOnInit(): void {
    const user = this.storageService.getUser();
      this.username = user.username;
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(baseUrl);
  }

  get(id: any): Observable<Event> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  findByIdAndUpdate(id: any, published: any, shareLink: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, {published, shareLink});
  }

  /* updateEvent(id: string, shareLink: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, {shareLink})
      .pipe(catchError(this.handleError));
  } */

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  findByIdAndRemove(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByCreatedBy(username: any): Observable<Event[]> {
    return this.http.get<Event[]>(`${baseUrl}?createdBy=${username}`);
  }

  find(): Observable<Event[]>{
    return this.http.get(baseUrl).pipe(map((results: any) => results))
 }

 findEvent(username: any): Observable<Event[]>{
  return this.http.get(`${baseUrl}?createdBy=${username}`).pipe(map((results: any) => results))
}

findByTitle(id: any): Observable<Event[]> {
  return this.http.get<Event[]>(`${baseUrl}?id=${id}`);
}
}
