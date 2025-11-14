import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Employee } from '../../models/employee/employee.component';
import { Department } from '../../models/department/department.component';
import { Designation } from '../../models/designation/designation.component';
import { EmployeeRequestDTO } from '../../models/employee-request/employee-request.dto';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  paginatedEmployees: Employee[] = [];

  departments: Department[] = [];
  designations: Designation[] = [];

  empForm!: FormGroup;
  editMode = false;
  searchTerm = '';
  sortAsc = true;
  currentPage = 1;
  pageSize = 2;

  selectedEmployeeId: number | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.empForm = this.fb.group({
      eName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      age: [{ value: '', disabled: true }],
      hireDate: ['', Validators.required],
      experience: [{ value: '', disabled: true }],
      gender: ['', Validators.required],
      depName: ['', Validators.required],
      desigName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
    this.getDesignations();
  }

  // API Calls
  getEmployees() {
    this.api.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.filteredEmployees = [...this.employees];
        this.applyPagination();
      },
      error: (err) => console.error(err),
    });
  }

  getDepartments() {
    this.api.getDepartments().subscribe((res) => (this.departments = res));
  }

  getDesignations() {
    this.api.getDesignations().subscribe((res) => (this.designations = res));
  }

  // Add or Update
  onSubmit() {
    if (this.empForm.invalid) return;

    const formValue = this.empForm.getRawValue();

    const payload:EmployeeRequestDTO = {
      eName: formValue.eName,
      email: formValue.email,
      dob: formValue.dob,
      hireDate: formValue.hireDate,
      gender: formValue.gender,
      depName: formValue.depName,
      desigName: formValue.desigName
    };

    if (this.editMode && this.selectedEmployeeId!= null) {
      this.api.updateEmployee(this.selectedEmployeeId, payload).subscribe({
        next:() => 
        {
        alert('Employee updated!');
        this.resetForm();
        this.getEmployees();
        },
        error: (err) => {
          console.log("employee validation error:", JSON.stringify(err.error, null, 2));
        }
      });
    } 
    
    else {
      this.api.createEmployee(payload).subscribe({
        next:() => 
        {
        alert('Employee added!');
        this.resetForm();
        this.getEmployees();
        },
       error:(err) => {
        console.log("employee validation error:", JSON.stringify(err.error,null,2));
       }
    });
    }
  }

  edit(emp: Employee) {
    this.editMode = true;
    this.empForm.patchValue(emp);

     this.empForm.patchValue({
      eName: emp.eName,
      email: emp.email,
      dob: emp.dob,
      hireDate: emp.hireDate,
      gender: emp.gender,
      depName: emp.departmentName,
      desigName: emp.designationName
  });
}

  delete(id: number) {
    if (confirm('Delete this employee?')) {
      this.api.deleteEmployee(id).subscribe(() => this.getEmployees());
    }
  }

  resetForm() {
    this.empForm.reset();
    this.editMode = false;
  }

  // Age & Experience
  calculateAge() {
    const dob = new Date(this.empForm.value.dob);
    const today = new Date();
    if (dob) {
      const age = today.getFullYear() - dob.getFullYear();
      this.empForm.patchValue({ age });
    }
  }

  calculateExperience() {
    const hire = new Date(this.empForm.value.hireDate);
    const today = new Date();
    if (hire) {
      const experience = today.getFullYear() - hire.getFullYear();
      this.empForm.patchValue({ experience });
    }
  }

  // Sorting
  sortByName() {
    this.sortAsc = !this.sortAsc;
    this.filteredEmployees.sort((a, b) =>
      this.sortAsc
        ? a.eName.localeCompare(b.eName)
        : b.eName.localeCompare(a.eName)
    );
    this.applyPagination();
  }

  // Search
  searchEmployee() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter((e) =>
      e.eName.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.applyPagination();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredEmployees = [...this.employees];
    this.applyPagination();
  }

  // Pagination
  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyPagination();
  }

  applyPagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.filteredEmployees.slice(start, end);
  }
}
