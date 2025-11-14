import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Designation } from '../../models/designation/designation.component';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  designations: Designation[] = [];
  filteredDesignations: Designation[] = [];
  paginatedDesignations: Designation[] = [];

  desigForm!: FormGroup;
  editMode = false;
  selectedDesigId: number | null = null;

  searchTerm = '';
  sortAsc = true;
  currentPage = 1;
  pageSize = 5;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.desigForm = this.fb.group({
      desigName: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.getDesignations();
  }

  // ✅ Get all designations
  getDesignations(): void {
    this.api.getDesignations().subscribe({
      next: (res) => {
        this.designations = res;
        this.filteredDesignations = [...this.designations];
        this.currentPage = 1;
        this.applyPagination();
      },
      error: (err) => console.error('Error fetching designations:', err),
    });
  }

  // ✅ Add or Update
  onSubmit(): void {
    if (this.desigForm.invalid) return;

    const formData = this.desigForm.value;

    if (this.editMode && this.selectedDesigId !== null) {
      const updatedDes: Designation = {
        desigid: this.selectedDesigId,
        desigName: formData.desigName,
        salary: formData.salary,
      };

      this.api.updateDesignation(this.selectedDesigId, updatedDes).subscribe({
        next: () => {
          alert('Designation updated successfully!');
          this.resetForm();
          this.getDesignations();
        },
        error: (err) => console.error('Update failed:', err),
      });
    } else {
      const newDes: Designation = {
        desigid: 0,
        desigName: formData.desigName,
        salary: formData.salary,
      };
      this.api.createDesignation(newDes).subscribe({
        next: () => {
          alert('Designation added successfully!');
          this.resetForm();
          this.getDesignations();
        },
        error: (err) => console.error('Add failed:', err),
      });
    }
  }

  // ✅ Edit designation
  editDesignation(des: Designation): void {
    this.editMode = true;
    this.selectedDesigId = des.desigid;
    this.desigForm.patchValue({
      desigName: des.desigName,
      salary: des.salary,
    });
  }

  // ✅ Delete designation
  deleteDesignation(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this designation?')) {
      this.api.deleteDesignation(id).subscribe({
        next: () => {
          alert('Designation deleted successfully!');
          this.getDesignations();
        },
        error: (err) => console.error('Delete failed:', err),
      });
    }
  }

  resetForm(): void {
    this.desigForm.reset();
    this.editMode = false;
    this.selectedDesigId = null;
  }

  // ✅ Search
  searchDesignation(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredDesignations = [...this.designations];
    } else {
      this.filteredDesignations = this.designations.filter((d) =>
        d.desigName.toLowerCase().includes(term)
      );
    }

    this.currentPage = 1;
    this.applyPagination();
  }

  // ✅ Clear Search
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredDesignations = [...this.designations];
    this.currentPage = 1;
    this.applyPagination();
  }

  // ✅ Sort by Name
  sortByName(): void {
    this.sortAsc = !this.sortAsc;
    this.filteredDesignations.sort((a, b) =>
      this.sortAsc
        ? a.desigName.localeCompare(b.desigName)
        : b.desigName.localeCompare(a.desigName)
    );
    this.currentPage = 1;
    this.applyPagination();
  }

  // ✅ Pagination
  get totalPages(): number {
    return Math.ceil(this.filteredDesignations.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  applyPagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedDesignations = this.filteredDesignations.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyPagination();
  }
}
