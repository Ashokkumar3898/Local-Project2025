import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee/employee.component';
import { Department } from '../../models/department/department.component';
import { Designation } from '../../models/designation/designation.component';
import { map } from 'rxjs';
import { EmployeeRequestDTO } from '../../models/employee-request/employee-request.dto';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  addDepartment(newDep: Department) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7054/api'; //  backend URL 

  constructor(private http: HttpClient) {}

  // -------------------- EMPLOYEE CRUD --------------------
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/Employee`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/Employee/${id}`);
  }

  createEmployee(emp: EmployeeRequestDTO): Observable<Employee> {
    return this.http.post<any>(`${this.apiUrl}/Employee`, emp);
  }

  updateEmployee(id: number, emp: EmployeeRequestDTO): Observable<Employee> {
    return this.http.put<any>(`${this.apiUrl}/Employee/${id}`, emp);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Employee/${id}`);
  }

  // -------------------- DEPARTMENT CRUD --------------------

getDepartments(): Observable<Department[]> {
  return this.http.get<any[]>(`${this.apiUrl}/Department`);
}



  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/Department/${id}`);
  }

  createDepartment(dep: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/Department`, dep);
  }

  updateDepartment(id: number, dep: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/Department/${id}`, dep);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Department/${id}`);
  }

  // -------------------- DESIGNATION CRUD --------------------
  getDesignations(): Observable<Designation[]> {
    return this.http.get<Designation[]>(`${this.apiUrl}/Designation`);
  }

  getDesignationById(id: number): Observable<Designation> {
    return this.http.get<Designation>(`${this.apiUrl}/Designation/${id}`);
  }

  createDesignation(des: Designation): Observable<Designation> {
    return this.http.post<Designation>(`${this.apiUrl}/Designation`, des);
  }

  updateDesignation(id: number, des: Designation): Observable<Designation> {
    return this.http.put<Designation>(`${this.apiUrl}/Designation/${id}`, des);
  }

  deleteDesignation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Designation/${id}`);
  }
}
