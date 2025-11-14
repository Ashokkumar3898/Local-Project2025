import { Component } from '@angular/core';

Component({
  selector: 'app-department',
  imports: [],
  templateUrl: './department.model.html',
  styleUrl: './department.model.css',
})


export interface Department {
  depid: number;
  depname: string;
}

