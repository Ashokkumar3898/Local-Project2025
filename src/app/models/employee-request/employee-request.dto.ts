import { Component } from '@angular/core';

Component({
  selector: 'app-employee-request',
  imports: [],
  templateUrl: './employee-request.dto.html',
  styleUrl: './employee-request.dto.css',
})
export interface EmployeeRequestDTO {
  eName: string;
  dob: string;
  hireDate: string;
  gender: string;
  email: string;
  depName: string;
  desigName: string;
}
