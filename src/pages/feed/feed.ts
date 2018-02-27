import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

 /* Estruturando o objeto, falando de feed 
  para criar uma variável em ts uso let / var e quando crio ela global.
    A chave cria pra mim um objeto. 
    propriedade titulo, sei que é propriedade pelos dois pontos... O valor vem em seguida.

    Obs: nome de propriedade nao pode ter espaço, caracter especial, acentos. Pode apenas ter 
    nomes simples, há duas formas de criar camioncase é normalmente usado pra nome de classe, seria como:
    FeedPage, começa com maiusculo pra dividir a palavra. Ou, podendo usar o anderline, sendo: objeto_feed.
    */

  public objeto_feed = {
      titulo:"Letícia Capucho",
      data:"November 5, 1955",
      descricao:"Estou criando um app incrível",
      qntd_likes: 12,
      qntd_comments: 4,
      time_comment:"11h ago teste"
   } // após feito isso, consumirei no html...

   public nome_usuario:string ="Letícia Capucho do Código";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    //alert(num1+num2);
  }

  ionViewDidLoad() {
    //this.somaDoisNumeros(10,99);
  }
}
