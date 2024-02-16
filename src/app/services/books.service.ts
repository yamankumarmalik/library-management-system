import { Injectable, signal } from '@angular/core';
//import books model
import { Books } from '../models/books';
//import httpClient to request data from json server
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  //base url for accessing the books array on json server
  private url = 'http://localhost:3000/books';

  //function to add a new book in the books array on json server
  addBook(book: any) {
    //this function return observable so we need to subscribe to this observable in the component to execute this request
    return this.httpClient.post<Books>(this.url, book);
  }

  //function to delete the book when the user clicks deleteBook button
  deleteBook(id: number) {
    const deleteUrl = `http://localhost:3000/books/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  // taking signals and variables to show data in updateBook component
  bookId = signal('');
  id: string;
  isbn: string;
  title: string;
  genre: string;
  pageCount: string;
  price: string;
  quantity: string;
  author: string;
  image: string;
  altText: string;

  // function so that the user can update Book details and intialize values that are seen by default at the edit component
  showBook(id: string) {
    let url = `http://localhost:3000/books/${id}`;
    return this.httpClient.get<any>(url);
  }

  //function to update the bookDetails in the jsonServer
  updateBook(user: any) {
    let url = `http://localhost:3000/books/${this.id}`;
    return this.httpClient.put<Books>(url, user);
  }
}
