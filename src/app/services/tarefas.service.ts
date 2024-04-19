import { Injectable } from '@angular/core';
import { Tarefas } from '../interfaces/Tarefas';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  constructor() { }

  //Esta lista virá da API
  tarefas:Tarefas[] = [
    {id: "1234", titulo: "Listar produtos", descricao: "Listar produtos", dataVencimento: "01/01/2025"},
    {id: "5678", titulo: "Contagem de produtos", descricao: "Contar produtos", dataVencimento: "02/02/2025"}
  ];

  listar():Tarefas[]{
    return this.tarefas;
  }

  remover(id:string){
    const tarefas = this.tarefas.find(c => c.id == id);

    if(tarefas){
       const index = this.tarefas.indexOf(tarefas);
       this.tarefas.splice(index,1);
    }
  }

  adicionar(tarefas:Tarefas){
    this.tarefas.push(tarefas);
  }
}
