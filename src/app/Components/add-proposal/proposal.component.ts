import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proposal } from 'src/app/Modals/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/Services/userService/user.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent {
  
  propFrom : FormGroup;
  addProposal:Proposal=
  {
    id:0,
    cost:0,
    description:'',
    noOfHours:0,
    service_id:0,
    user_id:''

  }
  constructor(private toast:NgToastService,private auth:AuthService, private httpClient: HttpClient,private route:ActivatedRoute, private router:Router,private ser:UserService)
  {
    this.propFrom = new FormGroup({
      // id: new FormControl(''),
      noOfHours : new FormControl('' , [Validators.required]),
      description : new FormControl('' , [Validators.required,Validators.minLength(20),Validators.maxLength(150)]),
      cost: new FormControl('', [Validators.required]),
      // service_id:new FormControl('' ,[Validators.required]),
      // user_id:new FormControl('' , [Validators.required]),
    });
    //this.addProposal.user_id=this.ser.user_id;
    this.serviceId=(this.route.snapshot.paramMap.get('id'))
    this.addProposal.service_id=this.serviceId;
    this.addProposal.user_id=this.auth.getIDfromToken();

}
serviceId:any;

addingprop()
{

    this.httpClient.post<Proposal>('https://localhost:7033/api/Proposal',this.addProposal).subscribe(
    (res)=>{console.log(res); });
    this.toast.success({detail:"Success",summary:"Your proposal has been sent successfully",duration:3000})
    this.router.navigate(['/services']);
}
CancelAdding()
  {
    this.router.navigate(['/services']);
  }
}
