import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { GetProposal } from 'src/app/Modals/user';
import { UserService } from 'src/app/Services/userService/user.service';
@Component({
  selector: 'app-all-proposals',
  templateUrl: './all-proposals.component.html',
  styleUrls: ['./all-proposals.component.css']
})
export class AllProposalsComponent implements OnInit {
// proposals:GetProposal[]=[];
// displayedColumns: string[] = ['id','No_of_Hours','desc','cost','ser_title','ser_Desc','ser_PublishDate','ser_User','Ser_EstimatedHours','Service_Status','show'];
MyData:GetProposal[]=[];
 
id!:string;
deletedproposalID:number=0;
constructor(  private userService:UserService,private route:ActivatedRoute, private router:Router)
{this.id=this.userService.userloginedID}
  ngOnInit():void {
    // this.ser.GetAllProps().subscribe({
    // next:(p)=> {
    //   this.MyData=p;
    // },
    // error:(err)=>{console.log(err)}
    // })
    
    this.userService.getproposal(this.id).subscribe({
      next:(u)=> 
      {
        console.log(u);
        this.MyData=u;
      },
      error:(err)=>console.log(err)
    });
  }
  // AddProposal()
  // {
  //   this.router.navigate(['proposal/add']);

  // }

Onback()
{
  this.router.navigate(['proposal']);
}



}
