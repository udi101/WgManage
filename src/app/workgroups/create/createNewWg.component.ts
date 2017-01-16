import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from './../../models/userLogin.model';

@Component({
  templateUrl: './createnewwg.component.html',
  styleUrls: ['./createnewwg.component.css']
})
export class CreateNewWgComponent implements OnInit {

  constructor() { }

  check(){
    console.log("test");
  }

  ngOnInit() {

  }

}
