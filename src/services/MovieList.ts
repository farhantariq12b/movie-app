import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import MovieListReponse from "@/types/MovieListReponse";

class MovieAPIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://jsonmock.hackerrank.com/api/",
      transformResponse: (r: string) => JSON.parse(r)
    });
  }

  private async axiosCall<T> (config: AxiosRequestConfig): Promise<any> {
    try {
      const { data } = await this.axiosInstance.request<T>(config)
      return data;
    } catch (error) {
      console.log(error)
    }
  }
 
  async getMovies(title: string, page: number): Promise<MovieListReponse> {
    return this.axiosCall<MovieListReponse>({ method : "get", url: `/movies/search/?${title ? 'Title=' + title : ''}${page ? '&page=' + page : ''}` });
  }
}
export default new MovieAPIService();