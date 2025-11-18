import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Employee } from '../../models/employee/employee.component';
import { Department } from '../../models/department/department.component';
import { Designation } from '../../models/designation/designation.component';
import { EmployeeRequestDTO } from '../../models/employee-request/employee-request.dto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatSnackBarModule, MatToolbarModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatExpansionModule, MatRadioModule, MatSelectModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // dialog references
  @ViewChild('addDialog') addDialog: any;
  @ViewChild('editDialog') editDialog!: any;
  @ViewChild('deleteDialog') deleteDialog: any;

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

  constructor(private fb: FormBuilder, private api: ApiService, private snackbar:MatSnackBar, private dialog: MatDialog) {
    this.empForm = this.fb.group({
      eName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      age: new FormControl({value:'', disabled: true}),
      hireDate: ['', Validators.required],
      experience: new FormControl({value:'', disabled: true}),
      gender: ['', Validators.required],
      depName: ['', Validators.required],
      desigName: ['', Validators.required],
    });
  }


  // reusable snackbar function
  showSnackbar(message:string)
  {
    this.snackbar.open(message,'close',{duration:3000, horizontalPosition: 'right', verticalPosition:'top'});
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


   // ===================================================
  //                 ADD DIALOG LOGIC
  // ===================================================

  openAddDialog() {
    this.empForm.reset();
    this.editMode = false;
    this.selectedEmployeeId = null;
    this.empForm.patchValue({age:'', experience:''});
    this.dialog.open(this.addDialog, {
      width: '450px'
    });
  }

  saveFromDialog() {
    const payload: EmployeeRequestDTO = this.empForm.getRawValue();

    this.api.createEmployee(payload).subscribe({
      next: () => {
        this.showSnackbar("Employee added successfully");
        this.dialog.closeAll();
        this.getEmployees();
      },
          error: (err) => {
      console.log("SERVER VALIDATION ERRORS (ADD):", err.error.errors);
  }
});
  }

  // ===================================================
  //                 EDIT DIALOG LOGIC
  // ===================================================

  openEditDialog(emp: Employee) {
    this.editMode = true;
    this.selectedEmployeeId = emp.eId;

    this.empForm.patchValue({
      eName: emp.eName,
      email: emp.email,
      dob: emp.dob,
      age: emp.age,
      hireDate: emp.hireDate,
      experience: emp.experience,
      gender: emp.gender,
      depName: emp.departmentName,
      desigName: emp.designationName
    });

    this.dialog.open(this.editDialog, {
      width: '450px',
      data: { id: emp.eId }
    });
  }

  updateFromDialog(id: number) {
    const payload: EmployeeRequestDTO = this.empForm.getRawValue();

    this.api.updateEmployee(id, payload).subscribe({
      next: () => {
        this.showSnackbar("Employee updated successfully");
        this.dialog.closeAll();
        this.getEmployees();
      },
      error: (err) => {
      console.log("SERVER VALIDATION ERRORS (UPDATE):", err.error.errors);
    }
    });
  }

  // ===================================================
  //              DELETE DIALOG LOGIC
  // ===================================================

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog, {
      width: '350px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {

    console.log("Dialog closed value (SHOULD BE ID):", result); // TEST 1

    if (result) {

      console.log("Sending DELETE request to API with ID:", result); // TEST 2

      this.api.deleteEmployee(result).subscribe({
        next: (res) => {
          console.log("API DELETE RESPONSE:", res); // TEST 3
          this.showSnackbar("Employee deleted!");
          this.getEmployees();
        },
        error: (err) => {
          console.error("DELETE ERROR:", err);       // TEST 4
        }
      });
    }
  });
}

  resetForm() {
    this.empForm.reset();
    this.editMode = false;
    this.selectedEmployeeId = null;
  }

  // Age & Experience
 calculateAge() {
    const dob = this.empForm.get('dob')?.value;

    //// FIXED: prevent NaN
    if (!dob) return;

    const date = new Date(dob);
    if (isNaN(date.getTime())) return; //// FIXED

    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();

    this.empForm.patchValue({ age });
  }

  calculateExperience() {
    const hire = this.empForm.get('hireDate')?.value;

    //// FIXED
    if (!hire) return;

    const date = new Date(hire);
    if (isNaN(date.getTime())) return; //// FIXED

    const today = new Date();
    const experience = today.getFullYear() - date.getFullYear();

    this.empForm.patchValue({ experience });
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
