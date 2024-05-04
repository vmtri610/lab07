import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  action = 'add';
  listFilm: film[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllFilms();
  }

  id = '';
  title = '';
  posterUrl = '';
  amountEposodes = '';
  releaseYear = '';
  rating = '';
  description = '';
  ageRestriction = '';

  getAllFilms() {
    this.http.get('http://localhost:1234/films').subscribe((data) => {
      this.listFilm = data as film[];
    });
  }

  addFilm() {
    const newFilm = {
      id: this.id,
      title: this.title,
      posterUrl: this.posterUrl,
      amountEposodes: this.amountEposodes,
      releaseYear: this.releaseYear,
      rating: this.rating,
      description: this.description,
      ageRestriction: this.ageRestriction,
    };
    this.http
      .post('http://localhost:1234/films', newFilm)
      .subscribe((data) => {});
    this.clear();
  }

  updateFilm() {
    const newFilm = {
      id: this.id,
      title: this.title,
      posterUrl: this.posterUrl,
      amountEposodes: this.amountEposodes,
      releaseYear: this.releaseYear,
      rating: this.rating,
      description: this.description,
      ageRestriction: this.ageRestriction,
    };
    this.http
      .put('http://localhost:1234/films/' + this.id, newFilm)
      .subscribe((data) => {});
    this.action = 'add';
    this.clear();
  }

  deleteFilm(id: number) {
    this.http
      .delete('http://localhost:1234/films/' + id)
      .subscribe((data) => {});
  }

  editFilm(film: film) {
    this.id = film.id.toString();
    this.title = film.title;
    this.posterUrl = film.posterUrl;
    this.amountEposodes = film.amountEposodes.toString();
    this.releaseYear = film.releaseYear;
    this.rating = film.rating.toString();
    this.description = film.description;
    this.ageRestriction = film.ageRestriction.toString();

    this.action = 'update';
  }

  clear() {
    this.id = '';
    this.title = '';
    this.posterUrl = '';
    this.amountEposodes = '';
    this.releaseYear = '';
    this.rating = '';
    this.description = '';
    this.ageRestriction = '';
    this.action = 'add';
  }
}

export interface film {
  id: number;
  title: string;
  posterUrl: string;
  amountEposodes: number;
  releaseYear: string;
  rating: number;
  description: string;
  ageRestriction: number;
}
