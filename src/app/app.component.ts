import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'unitTestDemo';
  
  public users : User[];

  constructor(private userService: UserService) {
    this.users = [];
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();
  }
  multiply(firstNumber:number,secondNumber:number):number{
    return firstNumber * secondNumber;
  };
  getData(){
    this.userService.getUsers().subscribe({
      next : (response:any) => {
        this.users = response;
      },
      error : (error) =>{
        this.users = [];
      }
    })
  }
}
interface User{
  id:number,
  fname: string,
  lname: string
}
