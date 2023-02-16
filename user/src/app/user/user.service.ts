import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { from, shareReplay } from 'rxjs';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  users:User[]=[];
  constructor(private http:HttpClient) { }
  ngOnInit (): void {
  }

  getData(){
    return this.http.get('http://localhost:3000/api/users');
  }
}
