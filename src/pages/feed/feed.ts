import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

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
  providers : [
    MoovieProvider // vai fazer que o MoovieProvider seja ejetado
  ]
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
  
       public lista_filmes = new Array<any>(); // quando insere o any vira um obejto javaScript
  
       public nome_usuario:string="Letícia Capucho do código";
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private é usado para que ele não seja enxergado/não fique exposto fora em outras classes
    private moovieProvider: MoovieProvider //aqui o MoovieProvider é ejetado, criamos o moovieProvider que recebe o nosso MoovieProvider
    ) {
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    //  alert(num1+num2);
  }

  ionViewDidLoad() {
    
    //this.somaDoisNumeros(10, 99);
    //console.log('ionViewDidLoad FeedPage');
    
    this.moovieProvider.getLatestMovies().subscribe(
      
      /* a função data é pra quando você pediu e é demostrado com sucesso, por exemplo:
      pediu informação do site, aí ele cai no console, em data e a error, que vai ser disparada, quando ocorrer um erro */
    
      data=>{ // esse => {} é pra entrar em uma função.
        
      const response = (data as any); 
      /* Foi transformado a resposta em um objeto de qualquer tipo (pois usei o any), 
      para que assim eu pegue o valor dele de um jeito que eu quiser. 
      
        é criado como const pois nao pode ser alterado
      
        */

        const objeto_retorno = JSON.parse(response._body);

        /*
          Foi feita em JSON.parse para transformar esse valor "response._body" que seria um texto
          em json
        */

        this.lista_filmes = objeto_retorno.results; // usei results pois na minha documentação mostra a minha lista de filmes
        console.log(objeto_retorno);  
        /* 
            Estava como: console.log(data)._body; // foi acrescentado o _body
            Como o Response não tem a propriedade _body, é feito um cast.
            Então, foi transformado este retorno em um obejto do tipo any, transforma
            a variavel data em tipo any, qualquer coisa.
            
        */
      }, error=>{
        console.log(error);
      }
     )

    /* Obs: Quando cheguei nessa part
      getLatestMovies(), ele me indica que posso usar o Observable<Response>, que ficaria assim..

      getLatestMovies():Observable<Response> - esse observable é como se fosse quando voce fizesse uma requisição em uma
      página web, aí ele fica lá carregando, carregando... aí ele vai lá e fala, cara vemk ver o conteúdo. Ou seja, quando
      é criado esse observable é dito pra observar essa função, e quando ele retornar é dado o resultado pra utilizar.

      */
  }
}
