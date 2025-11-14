import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  totalDepartments = 0;
  totalDesignations = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.api.getEmployees().subscribe(res => this.totalEmployees = res.length);
    this.api.getDepartments().subscribe(res => this.totalDepartments = res.length);
    this.api.getDesignations().subscribe(res => this.totalDesignations = res.length);
  }
}
