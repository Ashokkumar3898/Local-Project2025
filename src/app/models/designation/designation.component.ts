import { Component } from '@angular/core';

Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.model.html',
  styleUrl: './designation.model.css',
})



export interface Designation {
  desigid: number;
  desigName: string;
  salary: number;
}

