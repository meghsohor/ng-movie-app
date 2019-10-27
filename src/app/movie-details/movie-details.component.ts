import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { MovieApiService } from "../service/movie-api.service";
import { fadeInAnimation } from "../_animations/index";
import { Movie } from "../model/movie.model";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.scss"],
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" }
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  constructor(
    private route: ActivatedRoute,
    private movieApiService: MovieApiService
  ) { }

  ngOnInit() {
    const movieId = this.route.snapshot.params.id;
    this.movie = this.movieApiService.getMovie(movieId);
  }
}
