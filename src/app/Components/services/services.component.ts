import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  Categories: any;
  Services: any;
  ServicesByCatId: any;
  ServicesByCatName: any;
  selectedCategoryId: any;
  selectedCategoryName: any;
  constructor(private httpClient: HttpClient, private router: Router) {
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
    this.httpClient
      .get<any>(
        `https://localhost:7033/api/Service?service_category_id=${this.selectedCategoryId}`
      )
      .subscribe((ser) => {
        this.ServicesByCatId = ser;
        console.log(this.ServicesByCatId);
      });
    this.httpClient
      .get<any>(
        `https://localhost:7033/api/Service?service_category_name=${this.selectedCategoryName}`
      )
      .subscribe((ser) => {
        this.ServicesByCatName = ser;
        console.log(this.ServicesByCatName);
      });
  }
  filterCategory() {
    if (this.selectedCategoryId == 0) {
      this.ServicesByCatId = this.Services;
    } else {
      this.ServicesByCatId = this.Services.filter(
        (s: any) => s.service_category_id == this.selectedCategoryId
      );
      // this.router.navigate([
      //   'services',
      //   this.ServicesByCatId.service_category_name,
      // ]);
      for (let i = 0; i < this.ServicesByCatId.length; i++) {
        this.router.navigateByUrl(
          `services/${this.ServicesByCatId[i].service_category_name}`
        );
      }
    }
  }
}
