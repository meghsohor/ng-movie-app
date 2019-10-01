import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./movies/movies.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { FavouriteMoviesComponent } from "./favourite-movies/favourite-movies.component";

const routes: Routes = [
  { path: "", redirectTo: "movies", pathMatch: "full" },
  {
    path: "movies",
    component: MoviesComponent
  },
  {
    path: "favourites",
    component: FavouriteMoviesComponent
  },
  {
    path: "movie/:id",
    component: MovieDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
