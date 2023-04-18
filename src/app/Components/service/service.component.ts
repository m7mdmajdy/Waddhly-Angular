import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent {
  Service: any;
  currentServiceId: number;
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentServiceId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    console.log(this.currentServiceId);
    this.httpClient
      .get(`${environment.apiUrl}/Service/${this.currentServiceId}`)
      .subscribe((s) => {
        this.Service = s;
        console.log(s);
      });
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
  //   ngOnInit(): void {
  //     this.userStore.getIDfromStore().subscribe( id => {
  //       this.UserID = id || this.authService.getIDfromToken()
  //       console.log(this.UserID);
  //     });
  //     this.ser.get(this.UserID).subscribe({
  //       next:(u)=>{console.log(u);
  //        this.userData=u;
  //        console.log(this.userData);
  //       },
  //       error:(err)=>console.log(err)
  //     })
  //   }

  //   checkMoney(id:number)
  //   {
  //       // *************** Get Service By ID *****************
  //       this.httpClient
  //       .get<service>('https://localhost:7033/api/Service/'+id)
  //       .subscribe(
  //         (ser) => {
  //         this.selectedService = ser;
  //         console.log(this.selectedService);
  //             this.confirmservice.showConfirm('Are you sure you want to Apply this service',
  //               ()=>{this.router.navigate(['/Proposals/Proposal']);},
  //               ()=>{
  //                 Swal.fire({
  //                   title: "Thanks....."
  //                 });
  //               }
  //   );
  //   });
  // }

  //   addService(){

  //     this.service={
  //       title:this.serTitle,
  //       description:this.serDes,
  //       hours:this.serHour,
  //       category_id:this.selectedCategoryId2,
  //       user_id:this.UserID
  //     }
  //     console.log(this.service);
  //     return this.httpClient.post<any>(`https://localhost:7033/api/Service`,this.service).subscribe({next:val=>{
  //       this.toast.success({detail:"Success",summary:"You add your Category successfully",duration:3000})
  //       this.serTitle="",
  //       this.serDes="",
  //       this.serHour="",
  //       this.selectedCategoryId2=""
  //     },
  //       error:err=>
  //       this.toast.error({detail:"Error",summary:"Edit your Category Failed",duration:3000}),
  //       });

  //   }
  // }
}
