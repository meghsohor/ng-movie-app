import { Component, OnInit } from "@angular/core";
import { MovieApiService } from "../service/movie-api.service";
import { fadeInAnimation } from "../_animations/index";
import { Movie } from "../model/movie";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" }
})
export class MoviesComponent implements OnInit {
  movieList: Movie[] = [];
  filteredMovieList: Movie[] = [];

  constructor(private movieApiService: MovieApiService) {}

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList() {
    if (localStorage.getItem("movieList") === null) {
      this.movieApiService.getMovieList().subscribe(data => {
        this.movieList = data.results.map(movie => {
          console.log(movie.poster_path);
          movie.poster_path =
            "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
          movie.isFavourite = false;
          return movie;
        });
        localStorage.setItem("movieList", JSON.stringify(this.movieList));
        this.setMovieList(this.movieList);
      });
    } else {
      this.movieList = JSON.parse(localStorage.getItem("movieList"));
      this.setMovieList(this.movieList);
    }
  }

  setMovieList(updatedList) {
    this.filteredMovieList = updatedList;
  }

  toggleFav(id: number) {
    this.movieList = this.movieApiService.updateMovie(id);
    this.setMovieList(this.movieList);
  }

  searchMovies(event) {
    const query = event.target.value.trim();
    if (query.length > 0) {
      const searchText = query.toLowerCase().substring(0, 3);
      const filteredResult = this.movieList.filter(movie => {
        const movieName = movie.title;
        const movieSub = movieName.substring(0, 3).toLowerCase();
        return (
          movieName.toLowerCase().includes(searchText) ||
          this.checkName(movieSub, searchText)
        );
      });
      this.setMovieList(filteredResult);
    } else {
      this.setMovieList(this.movieList);
    }
  }

  checkName = (name, str) => {
    const pattern = str
      .split("")
      .map(letter => {
        return `(?=.*${letter})`;
      })
      .join("");

    const regex = new RegExp(`${pattern}`, "g");

    return name.match(regex);
  };
}
