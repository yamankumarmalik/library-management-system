import { Component, OnInit, inject } from '@angular/core';
//booksService import
import { BooksService } from '../services/books.service';
//loginService import
import { LoginService } from '../services/login.service';
//httpClient import
import { HttpClient } from '@angular/common/http';
//books Model import
import { Books } from '../models/books';
// import router
import { Router } from '@angular/router';
// import pipe search
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  //inject login service
  loginService = inject(LoginService);
  //inject book service
  bookService = inject(BooksService);
  //inject httpClient
  httpClient = inject(HttpClient);
  //inject router
  router = inject(Router);

  constructor() {}
  //signal variable declaration
  loginStatus;
  //array to store books array returned from the json server
  book: any[] = []; //array where the data is stored from json server [[{book data}]]
  //baseUrl for books array
  baseUrl: string = 'http://localhost:3000/books';

  //ngOnInit function intializes the values when the component is loaded
  ngOnInit(): void {
    this.httpClient.get<Books[]>(this.baseUrl).subscribe({
      next: (books) => {
        for (let book of books) {
          this.book.push(book);
        }
        console.log(this.book);
      },
      error: (err) => console.log(err),
    });
    this.loginStatus = this.loginService.userAdmin;
  }

  //function to be called when user click deleteBook button
  deleteBook(id: number) {
    if (window.confirm('Are you sure you want to delete this book entry?')) {
      this.bookService.deleteBook(id).subscribe({
        next: (res) => {
          // window.confirm() method display a confirmation dialog only when the user clicks okay then the item is deleted from the json server and local array

          let index;
          for (let i = 0; i < this.book.length; i++) {
            if (this.book[i].id === id) {
              index = i;
              break;
            }
          }
          this.book.splice(index, 1);
        },
        error: (err) => console.log(err),
      });
    }
  }

  // when the user click on update book we route him to the updateBook component
  showBook(id: string) {
    this.bookService.bookId.set(id);
    this.router.navigate(['/updateBook']);
  }
}
