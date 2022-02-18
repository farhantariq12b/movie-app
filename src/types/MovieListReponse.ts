import Movie from "./Movie";
import Pagination from "./Pagination";

export default interface MovieListReponse extends Pagination {
  data: Array<Movie>;
}
