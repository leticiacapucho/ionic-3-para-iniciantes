import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MoovieProvider Provider');
  }
//método para solicitar informação
  getLatestMovies(){
    //esse http no caso, é o objeto. No qual eu tenho funções e propriedades
    return this.http.get("https://api.themoviedb.org/3/movie/latest/"); 
    // esse movie/latest peguei em 
    // esse inicio da api eu peguei em https://developers.themoviedb.org/3/getting-started/authentication
  }
}
