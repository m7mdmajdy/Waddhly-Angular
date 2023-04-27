import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from 'src/app/Services/ProposalService/proposal.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/userService/user.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NgToastService } from 'ng-angular-popup';
import { ChatService } from 'src/app/Services/ChatService/chat-service.service';


@Component({
  selector: 'app-user-old-props',
  templateUrl: './user-old-props.component.html',
  styleUrls: ['./user-old-props.component.css']
})
export class UserOldPropsComponent implements OnInit {

  MyData: any

  public payPalConfig?: IPayPalConfig;

  async ngOnInit(): Promise<void> {
    this.signalRService.startConnection();
    this.initConfig(0,0)
    await this.getAllProposals(this.auth.getIDfromToken())
      .subscribe((data: any) => { this.retrievedProposals = data });
    setTimeout(() => {
      console.log(this.retrievedProposals);
    }, 200);
  }
  /**
   *
   */
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public signalRService: ChatService,
    private toast:NgToastService,
  ) { }
  private _url = "https://localhost:7033/api/GetProposalbyUserID/";

  getAllProposals(id: any): any {
    return this.http.get(this._url + id);
  }


  Onback() {
    this.router.navigate(['/home']);
  }
  retrievedProposals: any;




  initConfig(cost:any, propId:any): void {
    var decCost=new Number(cost);

    
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AdMdCV40pU3WQE5qMUpcGOOU5dTVKW4MNzIV4EbrdKz1btvFyi9XqkpYGl_mpa32F8pDKhERvuUnJ7EH',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: cost,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: cost
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: cost,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        this.toast.success({detail:"Success",summary:"You add your Category successfully",duration:3000}),        
        actions.order.get().then((details: any) => {
        });
      },
      onClientAuthorization: (data) => {
        console.log("AUTHHHHHHHHHHHHHHHHHH");

        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.signalRService.hubConnection
        .invoke("changeStatus", propId);
      },
      onCancel: (data, actions) => {
        console.log("CCCCCCCCCCCCCCCCCCCC");

        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log("EEEEEEEEEEEEEEEEE");
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log("clickkkkkkkkkkk");
        console.log('onClick', data, actions);
      }
    };
  }
}
