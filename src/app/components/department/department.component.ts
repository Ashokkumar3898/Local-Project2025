import { DepartmentFormComponent } from '../department-form/department-form.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Department } from '../../models/department/department.component';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentFormComponent
  ],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  filteredDepartments: Department[] = [];
  paginatedDepartments: Department[] = [];

  editMode = false;
  selectedDepartment: Department | null = null;

  searchTerm = '';
  sortAsc = true;

  currentPage = 1;
  pageSize = 4;
  paginationActive = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  // =============================
  // GET ALL DEPARTMENTS (FULL LIST FIRST)
  // =============================
  getDepartments(): void {
    this.api.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
        this.filteredDepartments = [...res];

        this.paginatedDepartments = [...this.filteredDepartments];
        this.paginationActive = false;

        this.currentPage = 1;
      },
      error: (err) => console.log("Backend error:", err)
    });
  }

  // =============================
  // CHILD FORM SUBMIT (CREATE / UPDATE)
  // =============================
  handleFormSubmit(payload: any) {

    // CREATE
    if (!this.editMode) {
      this.api.createDepartment(payload).subscribe({
        next: () => {
          alert('Department added successfully!');
          this.resetForm();
          this.getDepartments();
        },
        error: (err) => { console.log("validation details:", JSON.stringify(err.error , null, 2));
    }
  });
    }

    // UPDATE
    else {
      const id = this.selectedDepartment?.depid;

      if (id == null) {
        console.error("No department selected for update.");
        return;
      }

      this.api.updateDepartment(id, payload).subscribe({
        next: () => {
          alert('Department updated successfully!');
          this.resetForm();
          this.getDepartments();
        },
        error: (err) => console.log('Backend error:', err.error)
      });
    }
  }

  editDepartment(dep: Department): void {
    this.editMode = true;
    this.selectedDepartment = dep;
  }

  resetForm(): void {
    this.editMode = false;
    this.selectedDepartment = null;
  }

  // =============================
  // DELETE DEPARTMENT
  // =============================
  deleteDepartment(id: number | undefined): void {
    if (!id) return;

    if (confirm("Are you sure you want to delete this department?")) {
      this.api.deleteDepartment(id).subscribe({
        next: () => {
          alert("Department deleted successfully!");
          this.getDepartments();
        },
        error: (err) => console.log("Delete failed:", err)
      });
    }
  }

  // =============================
  // SEARCH
  // =============================
  searchDepartment(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredDepartments = [...this.departments];
    } else {
      this.filteredDepartments = this.departments.filter(d =>
        d.depname.toLowerCase().includes(term)
      );
    }

    this.paginatedDepartments = [...this.filteredDepartments];
    this.paginationActive = false;

    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredDepartments = [...this.departments];

    this.paginatedDepartments = [...this.filteredDepartments];
    this.paginationActive = false;
    this.currentPage = 1;
  }

  // =============================
  // SORT
  // =============================
  sortByName(): void {
    this.sortAsc = !this.sortAsc;

    this.filteredDepartments = [...this.filteredDepartments].sort((a, b) =>
      this.sortAsc
        ? a.depname.localeCompare(b.depname)
        : b.depname.localeCompare(a.depname)
    );

    this.paginatedDepartments = [...this.filteredDepartments];
    this.paginationActive = false;

    this.currentPage = 1;
  }

  clearSort(): void {
    this.filteredDepartments = [...this.departments];

    this.paginatedDepartments = [...this.filteredDepartments];
    this.paginationActive = false;

    this.currentPage = 1;
  }

  // =============================
  // PAGINATION
  // =============================
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredDepartments.length / this.pageSize));
  }

  applyPagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedDepartments = this.filteredDepartments.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    const realTotal = Math.ceil(this.filteredDepartments.length / this.pageSize);

    if (!this.paginationActive) {
      this.paginationActive = true;
      this.currentPage = realTotal >= 2 ? 2 : 1;
      this.applyPagination();
      return;
    }

    if (this.currentPage < realTotal) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  prevPage(): void {
    if (!this.paginationActive) return;

    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  // SHOW FULL LIST AGAIN
  showFullList(): void {
    this.paginationActive = false;
    this.currentPage = 1;
    this.paginatedDepartments = [...this.filteredDepartments];
  }

}
