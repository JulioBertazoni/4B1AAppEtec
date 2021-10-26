import { IFilmeDetalhes } from './../../models/IFilmeDetalhes.model';
import { FilmesService } from './../../services/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public idFilme: number = 0;
  public detalhesFilme: IFilmeDetalhes = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private filmesService: FilmesService
  ) { }

  ngOnInit(): void {
    this.idFilme = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.filmesService.buscarPorId(this.idFilme).subscribe(resposta =>{
      this.detalhesFilme = resposta;
    });
  }

}
