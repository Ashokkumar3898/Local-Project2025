import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Department } from '../../models/department/department.component';
import { Employee } from '../../models/employee/employee.component';
import { Designation } from '../../models/designation/designation.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Selected items (for Edit)
  private selectedDepartmentSource = new BehaviorSubject<Department | null>(null);
  selectedDepartment$ = this.selectedDepartmentSource.asObservable();

  private selectedEmployeeSource = new BehaviorSubject<Employee | null>(null);
  selectedEmployee$ = this.selectedEmployeeSource.asObservable();

  private selectedDesignationSource = new BehaviorSubject<Designation | null>(null);
  selectedDesignation$ = this.selectedDesignationSource.asObservable();

  // Refresh triggers (parents subscribe to reload lists)
  private refreshDepartmentSource = new Subject<void>();
  refreshDepartment$ = this.refreshDepartmentSource.asObservable();

  private refreshEmployeeSource = new Subject<void>();
  refreshEmployee$ = this.refreshEmployeeSource.asObservable();

  private refreshDesignationSource = new Subject<void>();
  refreshDesignation$ = this.refreshDesignationSource.asObservable();

  // --- Department helpers ---
  selectDepartment(dep: Department | null) {
    this.selectedDepartmentSource.next(dep);
  }

  triggerDepartmentRefresh() {
    this.refreshDepartmentSource.next();
  }

  // --- Employee helpers ---
  selectEmployee(emp: Employee | null) {
    this.selectedEmployeeSource.next(emp);
  }

  triggerEmployeeRefresh() {
    this.refreshEmployeeSource.next();
  }

  // --- Designation helpers ---
  selectDesignation(des: Designation | null) {
    this.selectedDesignationSource.next(des);
  }

  triggerDesignationRefresh() {
    this.refreshDesignationSource.next();
  }
}
