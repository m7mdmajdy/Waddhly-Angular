import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { UserService } from 'src/app/Services/userService/user.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { LoginedUser, service } from 'src/app/Modals/user';
import {NgConfirmService} from 'ng-confirm-box';
import Swal from 'sweetalert2';
import { TemplateBindingParseResult } from '@angular/compiler';
//import {Swal} from 'sweetalert2';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  Categories: any;
  Services: any;
  ServicesByCatId: any;
  ServicesByCatName: any;
  selectedCategoryId: any;
  selectedCategoryName: any;
  UserID:any;
  userData:LoginedUser=
  {
    id: '',
    firstName: '',
    lastName: '',
    title: '',
    summary: '',
    moneyAccount: 0,
    country: '',
    hourRate: 0,
    gender: ''
  };
  selectedService:service=
  {
    id: 0,
    title: '',
    description: '',
    date: new Date,
    hours: 0,
    status: false,
    service_category_id: 0,
    service_category_name: '',
    service_user_id:'',
    user_firstname: '',
    user_lastname: '',
    user_title: ''
  }
  ownerOfService:LoginedUser=
  {
    id: '',
    firstName: '',
    lastName: '',
    title: '',
    summary: '',
    moneyAccount: 0,
    country: '',
    hourRate: 0,
    gender: ''
  };
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ser:UserService,
    private authService:AuthService,
    private confirmservice:NgConfirmService ,
    private userStore:UserstoreService) {
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
      for (let i = 0; i <this.ServicesByCatId.length; i++) {
        this.router.navigateByUrl(
          `services/${this.ServicesByCatId[i].service_category_name}`
        );
      }
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


  ngOnInit(): void {
    this.userStore.getIDfromStore().subscribe( id => {
      this.UserID = id || this.authService.getIDfromToken()
      console.log(this.UserID);
    });
    this.ser.get(this.UserID).subscribe({
      next:(u)=>{console.log(u);
       this.userData=u;
       console.log(this.userData);
      },
      error:(err)=>console.log(err)
    })
  }

  checkMoney(id:number)
  {
    // *************** Get Service By ID *****************
    this.httpClient
    .get<service>('https://localhost:7033/api/Service/'+id)
    .subscribe(
      (ser) => {
      this.selectedService = ser;
      this.ser.service_id=this.selectedService.id;
      console.log(this.selectedService);
      this.httpClient
      .get<LoginedUser>('https://localhost:7033/api/User/'+this.selectedService.service_user_id)
      .subscribe(
        (u) => {
          this.ser.user_id=this.selectedService.service_user_id;
        this.ownerOfService = u;
        console.log(this.ownerOfService);
          this.confirmservice.showConfirm('Are you sure you want to Apply this service   '  ,
            ()=>{this.router.navigate(['/Proposals/Proposal']);},
            ()=>{
              Swal.fire({
                title: "Thanks.....",
                text:"thank you",
                icon:"success"
              })
            });
          // Swal.fire({
          //   title: "Warnning.....",
          //   text:"please check your money Account",
          //   icon:"warning"
          // })

        // else
        // {
        //   Swal.fire({
        //     title: "Success.....",
        //     text:"please check your money Account",
        //     icon:"warning"
        //   })
        //   // this.confirmservice.showConfirm('Are you sure you want to buy this service this service will cost you  ' + this.ownerOfService.hourRate * this.selectedService.hours ,
        //   //   ()=>{this.router.navigate(['/Proposals/Proposal']);},
        //   //   ()=>{}
        //   // );
        // }
      });
    });



  }
}
