import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Movie } from '../model/movie.model';
import { apiData } from '../model/api-data.model';

@Injectable({
  providedIn: "root"
})
export class MovieApiService {
  private dateObj = new Date();
  private currentDate =
    this.dateObj.getFullYear() +
    "-" +
    +(this.dateObj.getMonth() + 1) +
    "-" +
    (this.dateObj.getDate() < 10 ? "0" : "") +
    this.dateObj.getDate();
  /* private moviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=e7ed4cea3a8874276e782c4063ac1f05&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2019-10-01&release_date.gte=2019-10-01`; */

  private moviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=e7ed4cea3a8874276e782c4063ac1f05&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${this.currentDate}&release_date.gte=${this.currentDate}`;

  constructor(private http: HttpClient) { }

  public getMovieList(): Observable<apiData> {
    //return this.http.get<Movie[]>(this.moviesURL);
    return this.http.get(this.moviesURL).pipe(
      map((data: apiData) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  public getMovie(id: number) {
    const movieList = JSON.parse(localStorage.getItem("movieList"));
    return movieList.find(movie => movie.id === +id);
  }

  public updateMovie(id: number) {
    const movieList = JSON.parse(localStorage.getItem("movieList"));
    const updatedList = movieList.map(movie => {
      if (movie.id === id) {
        movie.isFavourite = !movie.isFavourite;
      }
      return movie;
    });
    localStorage.setItem("movieList", JSON.stringify(updatedList));
    return updatedList;
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
