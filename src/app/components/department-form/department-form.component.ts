import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnChanges {

  @Input() editMode = false;
  @Input() selectedDepartment: any = null;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<void>();

  depForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.depForm = this.fb.group({
      depname: ['', Validators.required]   // ✔ backend expects lowercase
    });
  }

  ngOnChanges() {
    if (this.selectedDepartment) {
      this.depForm.patchValue({
        depname: this.selectedDepartment.depname
      });
    } else {
      this.depForm.reset();
    }
  }

  submitForm() {
    if (this.depForm.invalid) return;

    const payload = {
      depname: this.depForm.value.depname   // ✔ correct DTO field
    };

    this.formSubmit.emit(payload);
  }

  resetForm() {
    this.depForm.reset();
    this.formReset.emit();
  }
}
