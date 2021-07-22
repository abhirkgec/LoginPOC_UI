import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit {
  public CurrentYear="";
  constructor() { }

  ngOnInit(): void {
    this.CurrentYear = new Date().getFullYear().toString();
  }

}
