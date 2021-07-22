import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  IsAuthenticated: boolean= false; 
  UserName = ""

  constructor(private authservice: AuthenticationService) { 
    this.IsAuthenticated = this.authservice.IsAuthenticated();
    this.authservice.getLoggedInName.subscribe(name => this.changeName(name));
  }

  ngOnInit(): void {
  }

  private changeName(name: string): void {
    this.IsAuthenticated= this.authservice.IsAuthenticated();
    this.UserName = name;
}
  Logout(){
    this.authservice.Logout();
  }
}
