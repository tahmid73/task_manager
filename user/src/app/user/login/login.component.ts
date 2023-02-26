import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { User } from '../user';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup

  constructor (
    private http:HttpClient,
    private fb:FormBuilder,
    ){}
  ngOnInit (): void {
    this.loginForm = this.fb.group({
      email:[''],
      password:[''],
    })
  }

  login(){
    console.log(this.loginForm.value)
    const Credentials={"email":this.loginForm.value.email,"password":this.loginForm.value.password}
    console.log(Credentials)
    this.http.post('http://localhost:3000/api/login', Credentials)
    .subscribe((data)=>{
      console.log(data);
    })
  }
  
}
