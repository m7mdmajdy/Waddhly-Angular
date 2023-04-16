import { Component, OnInit} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/Modals/user';
import { UserService } from 'src/app/Services/auth/User/user.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit{
  usercertificate:any;
  user:any;
  public UserData:any="";
  public userfname:string="";
  public userlname:string="";
  public useremail:string="";
  public userphone:string="";
  public usercountry:string="";
  public usermoney:string="";
  public userIMG: any;

  public UserID: string="";
  public UserPortofolio:any;
  public CertificateTitle:string="";
  public PortfolioTitle:string="";
  public CertificateURL:string="";
  public PortfolioURL:string="";
  public CertificateIMG: any;
  public PortfolioIMG: any;
  public CertificateDate: any;
  public PortfolioDate: any;
  formData=new FormData();
  constructor(private userservice:UserService,private auth:AuthService,private toast:NgToastService,private userStore:UserstoreService){
    this.userStore.getIDfromStore().subscribe( id => {
      this.UserID = id || this.auth.getIDfromToken()
      console.log(this.UserID);
    })
      this.userservice.getUserDataByID(this.UserID).subscribe( val => {
        this.UserData = val;
        console.log(this.UserData);
      })
  }
  ngOnInit(): void {
      this.userservice.getPorfolio(this.UserID).subscribe( val => {
        this.UserPortofolio=val;
        console.log(this.UserPortofolio);
      })
    }

    addNewCertificate(){
      this.formData.append('Title',this.CertificateTitle)
      this.formData.append('CertificateUrl',this.CertificateURL)
      this.formData.append('userid',this.UserID)
      this.userservice.addCertificate(this.formData).subscribe({next:val=>{
        this.toast.success({detail:"Success",summary:"You add a certificate successfully",duration:3000}),
        this.userservice.getUserDataByID(this.UserID).subscribe( val => {
          this.UserData = val;
          this.CertificateTitle=""
          this.CertificateURL=""
          this.CertificateIMG=""
          this.formData=new FormData();

        })},
        error:err=>
        this.toast.error({detail:"Error",summary:"Add certificate Failed",duration:3000}),

      })
    }

    deleteCertificate(id:string){
      this.userservice.deleteCertificate(id).subscribe({next:val=>{
        this.toast.success({detail:"Success",summary:"You delete a certificate successfully",duration:3000}),
        this.userservice.getUserDataByID(this.UserID).subscribe( val => {
          this.UserData = val;
        })},
        error:err=>
        this.toast.error({detail:"Error",summary:"Delete certificate Failed",duration:3000}),

      })
  }

  addNewPortofolio(){
      this.formData.append('Title',this.PortfolioTitle)
      this.formData.append('ProjectUrl',this.PortfolioURL)
      this.formData.append('Date',this.PortfolioDate)
      this.formData.append('userid',this.UserID)

      this.userservice.addPorfolio(this.UserID,this.formData).subscribe({next:val=>{
        this.toast.success({detail:"Success",summary:"You add a Job successfully",duration:3000}),
        this.userservice.getPorfolio(this.UserID).subscribe( val => {
          this.UserPortofolio=val;
          console.log(this.UserPortofolio);
          this.PortfolioTitle=""
          this.PortfolioURL=""
          this.PortfolioDate=""
          this.PortfolioIMG=""
          this.formData=new FormData();

        })},
        error:err=>
        this.toast.error({detail:"Error",summary:"Add Job Failed",duration:3000}),

      })
    }

  fileInput(data:any):void{
    // debugger;
    this.formData=new FormData();
    const files=data.files as File[];
    Array.from(files).forEach(file => this.formData.append('File',file))
    //this.formData.append('File',files)
  }

  deletePorfolio(id:string){
    this.userservice.deletePorfolio(this.UserID,id).subscribe({next:val=>{
      this.toast.success({detail:"Success",summary:"You delete your Job successfully",duration:3000}),
      this.userservice.getPorfolio(this.UserID).subscribe( val => {
        this.UserPortofolio=val;
        console.log(this.UserPortofolio);
      })},
      error:err=>
      this.toast.error({detail:"Error",summary:"Delete Job Failed",duration:3000}),
    })
  }

editinfo(){
      this.formData.append('summary',this.UserData.summary)
      this.formData.append('fname',this.UserData.fname)
      this.formData.append('lname',this.UserData.lname)
      this.formData.append('email',this.UserData.email)
      this.formData.append('PhoneNumber',this.UserData.phoneNumber)
      // this.formData.append('MoneyAccount',this.UserData.moneyAccount)
      // this.formData.append('hourRate',this.UserData.hourRate)
      // this.formData.append('categoryID',this.UserData.categoryID)
      this.formData.append('country',this.UserData.country)
      this.formData.append('File',this.UserData.userimage)


      this.userservice.editUserDataByID(this.UserID,this.formData).subscribe({next:val=>{
        this.toast.success({detail:"Success",summary:"You add a Job successfully",duration:3000}),
        this.userservice.getUserDataByID(this.UserID).subscribe( val => {
          this.UserData = val;
          console.log(this.UserData);
          this.formData=new FormData();
        })},
        error:err=>
        this.toast.error({detail:"Error",summary:"Edit your information Failed",duration:3000}),

      })
}

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.get('password')?.value;
  //   const confirmPassword = formGroup.get('confirm_password')?.value;

  //   if (password !== confirmPassword) {
  //     formGroup.get('confirm_password')?.setErrors({ passwordMismatch: true });
  //   } else {
  //     formGroup.get('confirm_password')?.setErrors(null);
  //   }
  // }
}
