import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  // signal which store userAdmin Login value if logged in or not (by default Log In)
  userAdmin = signal(false);

  //base url for the json object
  url = 'http://localhost:3000/admins';

  //function to check user credential from userLogin.json file
  checkUser(loginForm: any) {
    this.httpClient.get<login[]>(this.url).subscribe({
      next: (res) => {
        // find return true if user is there and false is user is not there
        // find takes a callback function (which takes an object inside of res array)
        const user = res.find((a) => {
          return (
            a.password === loginForm.password &&
            a.username === loginForm.username
          );
        });
        if (user) {
          this.router.navigate(['/books']);
          this.userAdmin.set(true);
        } else {
          alert('The entered user credentials are incorrect!');
        }
      },
      error: (err) => console.log(err),
    });
  }

  //function to add new user on the json server
  addNewUser(user: login) {
    this.httpClient.post<login>(this.url, user).subscribe({
      error: (err) => console.log(err),
    });
  }

  //variable for the search service (a signal so the user knows when the status changes)
  searchStatus = signal("");
}
