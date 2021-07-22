import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../GlobalConstants';
import { DashboardService } from './dashboard-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardsvc: DashboardService,
    private router: Router,
    private authsvc: AuthenticationService
  ) {

   }

  ngOnInit(): void {
    this.dashboardsvc.ReadData(GlobalConstants.API_URL.BaseUrl + GlobalConstants.API_URL.AUTH.Dashboard)
    .subscribe(
        data => {
          console.log(data);
          // new this.authsvc.getLoggedInName(data.fullname);
        },
        error => {
         this.authsvc.Logout();
        });
  }

}
