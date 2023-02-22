import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup
  constructor (
    private http:HttpClient,
    private fb:FormBuilder,
    ){}
  ngOnInit (): void {
    this.registerForm = this.fb.group({
      name:[''],
      password:[''],
      email:[''],
    })
  }
  register(){
    console.log(this.registerForm.value)
    const Credentials={"email":this.registerForm.value.email,"password":this.registerForm.value.password, "name":this.registerForm.value.name}
    this.http.post('http://localhost:3000/api/register', Credentials)
    .subscribe((data)=>{
      console.log(data);
    })
    console.log(Credentials)
  }

}
