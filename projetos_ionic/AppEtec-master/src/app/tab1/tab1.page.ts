import { DadosService } from './../service/dados.service';
import { GenerosService } from './../service/generos.service';
import { FilmeService } from './../service/filme.service';
import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IFilme } from '../models/IFilme.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public nomeTab = 'Filmes favoritos';
  public buscarTexto: string;

  public listaDeFilmes: IFilme[] = [];
  public generos: string[] = [];

  constructor(
    public alertCont: AlertController,
    public toastController: ToastController,
    public filmeService: FilmeService,
    public generosService: GenerosService,
    public rout: Router,
    public dados: DadosService
  ) {}

  listarFilmes(){
    this.filmeService.listarPopulares().subscribe(dados =>{this.listaDeFilmes = dados.results;});
  }

  listarGeneros(): void{
    this.generosService.listar().subscribe(
      listaGeneros => {listaGeneros.genres.forEach(cadaGenero =>{this.generos[cadaGenero.id] = cadaGenero.name;});}
    );
  }

  buscar(element: any): void{
    const textBusca: string = element.detail.value;
    if(textBusca.length > 0){
      this.filmeService.buscarPorNome(textBusca).subscribe(listFilme => {
        this.listaDeFilmes = listFilme.results;
      });
    }
    else{
      this.listarFilmes();
    }
    console.log(this.listaDeFilmes);
  }

  ngOnInit(){
    this.listarFilmes();
    this.listarGeneros();
  }

  async curtir(filme: string) {
    const alert = await this.alertCont.create({
      header: 'Confirmação!',
      message: 'Tem ceteza desta ação?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.link(filme);
          }
        }
      ]
    });

    await alert.present();
  }

  public verDetalhes(filme: IFilme): void{
    this.dados.setDados('filme',filme);
    const routa = `/detalhes/${filme.id}`;
    this.rout.navigateByUrl(routa);
  }

  async favoritar() {
    this.filmeService.addFavoritos().subscribe(dados =>{this.listaDeFilmes = dados.results;});
  }


  async link(filme: string){
    const toast = await this.toastController.create({
      header: `Link atribuido: ${filme}`,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
