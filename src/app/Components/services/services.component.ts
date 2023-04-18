import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

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
      .get<any>(`${environment.apiUrl}/Category`)
      .subscribe((cats) => {
        this.Categories = cats;
        console.log(this.Categories);
      });
    this.httpClient
      .get<any>(`${environment.apiUrl}/Service`)
      .subscribe((ser) => {
        this.Services = ser;
        console.log(this.Services);
      });
    this.httpClient
      .get<any>(
        `${environment.apiUrl}/Service?service_category_id=${this.selectedCategoryId}`
      )
      .subscribe((ser) => {
        this.ServicesByCatId = ser;
        console.log(this.ServicesByCatId);
      });
    this.httpClient
      .get<any>(
        `${environment.apiUrl}/Service?service_category_name=${this.selectedCategoryName}`
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
      /////////////////////////////////////

      // for (let i = 0; i < this.ServicesByCatId.length; i++) {
      //   this.router.navigateByUrl(
      //     `service/${this.ServicesByCatId[i].service_category_id}`
      //   );
      // }
      /////////////////////////////////////
    }
  }
  subString(subString: string): string {
    if (subString.length > 125) {
      return subString.substring(0, 125) + '...';
    }
    return subString.substring(0, 125);
  }
  subDates(date: Date) {
    let currentDate: any = new Date();
    let currentDateCalc: any = new Date(currentDate);
    let serviceDate: any = new Date(date);
    let result = (currentDateCalc.getTime() - serviceDate.getTime()) / 1000;
    let timeAgo = '';
    if (result < 60) {
      timeAgo = `${Math.round(result)} seconds ago`;
    } else if (result > 60 && result < 60 * 60) {
      timeAgo = `${Math.round(result / 60)} minutes ago`;
    } else if (result > 60 * 60 && result < 60 * 60 * 24) {
      timeAgo = `${Math.round(result / 60 / 60)} hours ago`;
    } else if (result > 60 * 60 * 24 && result < 60 * 60 * 24 * 30) {
      timeAgo = `${Math.round(result / 60 / 60 / 24)} days ago`;
    } else if (result > 60 * 60 * 24 * 30 && result < 60 * 60 * 24 * 365) {
      timeAgo = `${Math.round(result / 60 / 60 / 24 / 30)} months ago`;
    } else {
      timeAgo = `${Math.round(result / 60 / 60 / 24 / 365)} years ago`;
    }
    if (timeAgo.includes('1 ')) return timeAgo.replace('s ', ' ');
    else return timeAgo;
  }
  checkStatus(status: boolean) {
    if (status == true) return 'opened';
    else return 'closed';
  }
}
