import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
  providers: [
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
    titulo: "Letícia Capucho",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago teste"
  } // após feito isso, consumirei no html...

  public lista_filmes = new Array<any>(); // quando insere o any vira um obejto javaScript
  public page = 1;

  public nome_usuario: string = "Letícia Capucho do código";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private é usado para que ele não seja enxergado/não fique exposto fora em outras classes
    private moovieProvider: MoovieProvider, //aqui o MoovieProvider é ejetado, criamos o moovieProvider que recebe o nosso MoovieProvider
    public loadingCtrl: LoadingController
  ) {
  }

  // Método de abrir
  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  // Método de fechar
  fechaCarregando() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    //  alert(num1+num2);
  }
  /*
     Ou seja, quando alguém puxar pra baixo pra atualizar a page, vai chamar essa função doRefresh, vai
    armazenar o refresher lá em cima quando entrar em (this.refresher = refresher;), e vai dizer que, sim 
    está carregando o refresher (this.isRefreshing = true;)
  
  */

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes(); // chama a função de carregar filmes

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    /* Estava o ionViewDidLoad(), porém ele só carrega uma vez. 
 então, alterei para ionViewDidEnter, porque sempre que ele entra na página carregue a lista de filmes.
 */
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id}); /* função que vai de fato chamar a função FilmeDetalhesPage,
     o filme.id está sendo passado para o id, para a página FilmeDetalhesPage
    */
  }

  doInfinite(infiniteScroll) {
      this.page++; // quando chegar no final da página quero que atualize, carregue mais / a próxima
      this.infiniteScroll = infiniteScroll;
      this.carregarFilmes(true); // quando chegar no infinite scroll quero que carregue mais filmes, adicionando mais no final da page
  
  }

  carregarFilmes(newpage: boolean = false){

    //this.somaDoisNumeros(10, 99);
    //console.log('ionViewDidLoad FeedPage');
    this.abreCarregando();
    this.moovieProvider.getLatestMovies(this.page).subscribe(

      /* a função data é pra quando você pediu e é demostrado com sucesso, por exemplo:
      pediu informação do site, aí ele cai no console, em data e a error, que vai ser disparada, quando ocorrer um erro */

      data => { // esse => {} é pra entrar em uma função.

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

        if(newpage){
            this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results); /* aqui mostra que a lista filmes está recebendo ela mesma com o objeto
             concatenado, ou seja, ele concatena o retorno e manda para dentro daminha lista filmes e atualiza o valor dela. No caso, acrescentando
             informações a mais.
             */

             this.infiniteScroll.complete();
        } else { 

        this.lista_filmes = objeto_retorno.results; // usei results pois na minha documentação mostra a minha lista de filmes
        }
      /*     
        console.log(objeto_retorno);
    
            Estava como: console.log(data)._body; // foi acrescentado o _body
            Como o Response não tem a propriedade _body, é feito um cast.
            Então, foi transformado este retorno em um obejto do tipo any, transforma
            a variavel data em tipo any, qualquer coisa.
            
        */
        this.fechaCarregando();
        // Se o refresher estiver rodando, chama essa função
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
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
