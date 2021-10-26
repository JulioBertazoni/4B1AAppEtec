import { IFilme } from './../../models/IFilme.model';
import { FilmesService } from './../../services/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buscar: string = '';
  public listaDeFilmes?: IFilme[] = [];

  constructor(
    private filmesService: FilmesService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    if(this.router.url === '/playlist'){
      this.getPlaylist();
    }
    else{
    this.buscarFilmesPopulares();
    }
  }

  getPlaylist(): void{
    this.filmesService.getPlaylist().subscribe(listaDeFilmes => {
      this.listaDeFilmes = listaDeFilmes;
    });
  }

  AddAPlaylist(filme: IFilme):void{
    this.filmesService.addFilmePlaylist(filme).subscribe(resposta => {
      this.filmesService.exibirMensagens('Adicionado à playlist',
      `${resposta.title} foi adicionado com sucesso.`,
      'toast-success');
    });
  }

  buscarFilmes(filtro: string): void{
    this.filmesService.buscarFilmes(filtro).subscribe(retorno =>{
      this.listaDeFilmes = retorno.results;
    });
  }

  buscarFilmesPopulares(): void{
    this.filmesService.listarPopulares().subscribe(result => {
      this.listaDeFilmes = result.results;
    });
  }

  filtrarFilmes(): void{
    if(this.buscar.length > 0)
      this.buscarFilmes(this.buscar);
    else
      this.buscarFilmesPopulares();
  }

  listarFilmeAleatorio(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    this.buscarFilmes(characters.charAt(Math.floor(Math.random() * charactersLength)));
 }
}
