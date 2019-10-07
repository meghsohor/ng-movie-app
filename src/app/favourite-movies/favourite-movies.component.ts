import { Component, OnInit } from "@angular/core";
import { MovieApiService } from "../service/movie-api.service";
import { fadeInAnimation } from "../_animations/index";
import { Movie } from "../model/movie";

@Component({
  selector: "app-favourite-movies",
  templateUrl: "./favourite-movies.component.html",
  styleUrls: ["./favourite-movies.component.scss"],
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" }
})
export class FavouriteMoviesComponent implements OnInit {
  favouriteMovieList: Movie[] = [];

  constructor(private movieApiService: MovieApiService) {}

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList() {
    let allMovies = [];
    if (localStorage.getItem("movieList") === null) {
      this.movieApiService.getMovieList().subscribe(data => {
        const {results} = data;
        allMovies = results.map(movie => {
          movie.poster_path =
            "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
          movie.isFavourite = false;
          return movie;
        });
        localStorage.setItem("movieList", JSON.stringify(allMovies));
      });
    } else {
      allMovies = JSON.parse(localStorage.getItem("movieList"));
    }
    this.favouriteMovieList = allMovies.filter(movie => movie.isFavourite);
  }

  toggleFav(id: number) {
    const allMovies = this.movieApiService.updateMovie(id);
    this.favouriteMovieList = allMovies.filter(movie => movie.isFavourite);
  }
}
