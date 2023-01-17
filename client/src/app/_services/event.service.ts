import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

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
}
