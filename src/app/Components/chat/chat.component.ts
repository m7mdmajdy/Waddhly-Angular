import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Route, Router } from '@angular/router';
import { ChatService } from 'src/app/Services/ChatService/chat-service.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  msg: any;
  selectedUser: any;
  UserID: any;
  constructor(
    private router: Router,
    public signalRService: ChatService,
    private auth: AuthService,
    private userStore: UserstoreService
  ) {
    this.userStore.getIDfromStore().subscribe((val) => {
      this.UserID = val || this.auth.getIDfromToken();
    });
  }
  users: any[] = [];
  userConnectionId: any;
  loggedUsername = this.auth.getEmailfromToken();

  ngOnInit(): void {
    console.log(this.auth.getEmailfromToken());

    this.signalRService.startConnection();
    console.log('Chat Started');

    setTimeout(() => {
      this.userConnectionId =
        this.signalRService.hubConnection.invoke('GetConnectionId');
      this.signalRService.hubConnection.invoke(
        'updateConnectionId',
        this.auth.getIDfromToken()
      );
    }, 100);
    this.signalRService
      .getAllUsers(this.auth.getIDfromToken())
      .subscribe((data) => (this.users = data));
    this.sendMessagesResponse();
    this.sendMsgLis();
  }
  recieverConnectionId: any;
  pushedMsg: any;
  async sendMsgInv(): Promise<void> {
    if (this.msg?.trim() === '' || this.msg == null) return;
    this.recieverConnectionId = await this.signalRService.hubConnection.invoke(
      'GetConnectionIdByUserId',
      this.selectedUser.id
    );

    await this.signalRService.hubConnection.invoke(
      'sendMsg',
      this.recieverConnectionId,
      this.auth.getIDfromToken(),
      this.selectedUser.id,
      this.msg
    );
    console.log(this.msgs[1]);

    this.pushedMsg = {
      content: this.msg,
      date: new Date(),
      recieverId: this.selectedUser.id,
      recieverName: this.selectedUser.userName,
      senderId: this.auth.getIDfromToken(),
      senderName: this.auth.getUsernamefromToken(),
    };
    this.msgs.push(this.pushedMsg);
    this.msg = '';
  }

  msgs: any;
  private sendMsgLis(): void {
    this.signalRService.hubConnection.on(
      'sendMsgResponse',
      (connId: string, userReciever: string, msg: any) => {
        if (
          this.selectedUser != null &&
          this.selectedUser.id === userReciever
        ) {
          console.log('true');
          this.msgs = msg;
        }
      }
    );
  }
  private sendMessagesResponse(): void {
    this.signalRService.hubConnection.on(
      'sendMessagesResponse',
      (connId: string, msg: any) => {
        this.msgs = msg;
      }
    );
  }
  getMessages(user: any) {
    // this.recieverID=user.id
    // this.selectedUser = user
    this.getCurrUser(user);
    this.signalRService
      .getUsersMessages(this.auth.getIDfromToken(), user.id)
      .subscribe((data) => {
        this.msgs = data;
      });
  }
  getCurrUser(user: any) {
    this.signalRService.getUser(user.id).subscribe((data) => {
      this.selectedUser = data;
    });
  }

  openChatPage() {
    this.router.navigate(['/session', this.selectedUser.userName]);
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
}
