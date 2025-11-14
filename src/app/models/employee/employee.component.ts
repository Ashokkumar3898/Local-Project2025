import { Component } from '@angular/core';


Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.model.html',
  styleUrl: './employee.model.css',
})






export interface Employee {
  eId: number;
  eName: string;
  age: number;
  experience: number;
  dob: Date;
  hireDate: Date;
  gender: string;
  email: string;
  depId: number;
  desigId: number;
  departmentName?: string;
  designationName?: string;
}
