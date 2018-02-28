// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable() // Essa notação diz que será inserido/via uma injeção de dependencia, ou seja, dentro de outra classe. 

export class MoovieProvider {
    private baseApiPath = "https://api.themoviedb.org/3";
 
    //Estava como HttpClient, mas no curso apenas como Http
  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }
  
  //método para solicitar informação
  getLatestMovies(){
    //esse http no caso, é o objeto. No qual eu tenho funções e propriedades
   
    return this.http.get(this.baseApiPath + '/movie/popular?api_key=' + this.getApiKey()); 
   
    /* ou eu poderia deixar tudo aqui https://api.themoviedb.org/3 //movie/popular
    porém como todas as variáveis vem depois dessa https://api.themoviedb.org/3, utilizarei dessa forma pra colocar o this.baseApiPath
    aí coloquei o + para concatenar, juntar... a url do api e do movie
    -  esse /movie/popular peguei em 
    - esse inicio da api eu peguei em https://developers.themoviedb.org/3/getting-started/authentication 
    
    - pode usar o this.getApiKey ou deixar tudo em um "/movie/popular?api_key=api_key");
    */
  }

  getApiKey(): string{
    return "838775ba2cace7c0fdbc1bba445c13ba";
  }
}
