import { Component, inject, OnInit } from '@angular/core';
//import forms
import { FormGroup, FormControl, Validators } from '@angular/forms';
//Books Service
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  //inject Book Service
  bookService = inject(BooksService);

  //declaring form group
  addBookForm: FormGroup;

  //ngOnInit intializes the values when the component is loaded
  ngOnInit(): void {
    this.addBookForm = new FormGroup({
      isbn: new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
      ]),
      title: new FormControl(null, Validators.required),
      genre: new FormControl(null, Validators.required),
      pageCount: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      altText: new FormControl(null, Validators.required),
    });
  }

  //button to submit the form when clicked
  onSubmit() {
    this.bookService.addBook(this.addBookForm.value).subscribe({
      next: (res) => {
        //to alert the user that the book has been added successfully
        alert('Your book has been added successfully');
        //to reset the form after submission
        this.addBookForm.reset();
      },
      error: (err) => console.log(err),
    });
  }
}
