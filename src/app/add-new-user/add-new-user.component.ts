import { Component, inject, OnInit } from '@angular/core';
//import required form directives
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import loginService to add new users
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css',
})
export class AddNewUserComponent implements OnInit {
  //inject loginService
  loginService = inject(LoginService);

  //formGroup of the form with name
  addNewUser: FormGroup;

  //ngOnInit() is initialized when the component is loaded for the first time
  ngOnInit(): void {
    this.addNewUser = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  //function to be called when the user clicks submit button
  onSubmit() {
    this.loginService.addNewUser(this.addNewUser.value);
  }
}
