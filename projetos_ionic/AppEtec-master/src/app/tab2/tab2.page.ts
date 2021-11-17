import { FilmeService } from './../service/filme.service';
import { IFilmesFavoritos } from '../models/IFilmesFavoritos.model';
import { GenerosService } from './../service/generos.service';

import { Component, OnInit } from '@angular/core';
import { IFilme } from '../models/IFilme.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public filmesFavoritos: IFilmesFavoritos;

  constructor(public filmeService: FilmeService) {}

  ngOnInit(){
    this.buscarFavoritosApi();
  }

  public buscarFavoritosApi(): void{
    this.filmeService.buscarFavoritos().subscribe(listaFilmesFavoritos => {
      this.filmesFavoritos = listaFilmesFavoritos;
    });
  }

  public listarFavoritos(): void{
    this.filmeService.buscarFavoritos().subscribe(dados =>{this.filmesFavoritos.results = dados.results;});;
  }

}
