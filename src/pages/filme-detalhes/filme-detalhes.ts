import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MoovieProvider]
})
export class FilmeDetalhesPage {
  public filme;
  public filmeid;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider) {
  }

  ionViewDidEnter() {
    this.filmeid = this.navParams.get("id");
    /*
         Esse getMovieDetails, estou pegando direto a resposta do http, e ele é um observable que tem um subscribe
      que é para que ele me avise quando receber a resposta no app, o data é um objeto do angular
    
    */
    this.movieProvider.getMovieDetails(this.filmeid).subscribe(data=>{
      let retorno = (data as any)._body
      this.filme = JSON.parse(retorno);
      console.log(this.filme);
    }, error =>{
      console.log(error);
    })
  }
}
 