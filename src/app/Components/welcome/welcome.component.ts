import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  Categories: any;
  Services: any;
  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<any>('https://localhost:7033/api/Category')
      .subscribe((cats) => {
        this.Categories = cats;
        console.log(this.Categories);
      });
    this.httpClient
      .get<any>('https://localhost:7033/api/Service')
      .subscribe((ser) => {
        this.Services = ser;
        console.log(this.Services);
      });
  }
}
