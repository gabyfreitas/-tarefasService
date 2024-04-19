import { Component } from '@angular/core';
import { TarefasService } from '../../services/tarefas.service';
import { Tarefas } from '../../interfaces/Tarefas';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent {
    tarefas:Tarefas[] = [];
    tarefasForm: FormGroup = new FormGroup({})

   constructor(private tarefasService:TarefasService, private formBuilder: FormBuilder) {
      this.tarefasForm = this.formBuilder.group({
        titulo: ['', Validators.required],
        descricao: ['', Validators.required],
        dataVencimento: ['', Validators.required]
      })
  }

  generateRandomString(length: number): string  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ''
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inserir(){
     if(this.tarefasForm.valid) {
        const tarefasNovo: Tarefas = {
          titulo: this.tarefasForm.value.titulo,
          descricao: this.tarefasForm.value.descricao,
          dataVencimento: this.tarefasForm.value.dataVencimento,
          id : this.generateRandomString(6)
        }
        this.tarefasForm.reset()
        this.tarefasService.adicionar(tarefasNovo)
        alert('Cadastrado com sucesso!')
     }
  }

  remover(id:string):void{
    this.tarefasService.remover(id);
    alert('Removido com sucesso')
  }

  listar():void{
      this.tarefas = this.tarefasService.listar();
  }

  ngOnInit():void{
    this.listar();
  }

};
