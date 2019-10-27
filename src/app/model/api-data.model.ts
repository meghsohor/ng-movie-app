import { Movie } from './movie.model';

export class apiData {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}