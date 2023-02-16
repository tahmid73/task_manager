import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { take } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
datas:any;
  
  
  constructor(private userService:UserService) { }
  ngOnInit (): void {
    this.userService
      .getData()
      .pipe(take(1))
      .subscribe((data)=>{
      this.datas=data
    })
    console.log(this.datas);
  }
}