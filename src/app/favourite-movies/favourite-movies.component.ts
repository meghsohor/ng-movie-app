import { Component, OnInit } from "@angular/core";
import { MovieApiService } from "../service/movie-api.service";
import { fadeInAnimation } from "../_animations/index";
import { Movie } from "../model/movie.model";
import { apiData } from '../model/api-data.model';

@Component({
  selector: "app-favourite-movies",
  templateUrl: "./favourite-movies.component.html",
  styleUrls: ["./favourite-movies.component.scss"],
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" }
})
export class FavouriteMoviesComponent implements OnInit {
  favouriteMovieList: Movie[] = [];

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(): void {
    let allMovies = [];
    this.movieApiService.getMovieList()
      .subscribe(
        (data: apiData) => {
          allMovies = data.results.map(movie => {
            console.log(movie.poster_path);
            movie.poster_path =
              "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
            movie.isFavourite = false;
            return movie;
          });
        }
      );
    this.favouriteMovieList = allMovies.filter(movie => movie.isFavourite);
  }

  toggleFav(id: number): void {
    const allMovies = this.movieApiService.updateMovie(id);
    this.favouriteMovieList = allMovies.filter(movie => movie.isFavourite);
  }
}
