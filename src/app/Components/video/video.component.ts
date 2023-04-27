import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Peer from 'peerjs';
import { ChatService } from 'src/app/Services/ChatService/chat-service.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  private peer: Peer;
  peerIdShare: string = '';
  peerId: string = '';
  UserID: any;
  private lazyStream: any;
  currentPeer: any;
  private peerList: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private signalRService: ChatService,
    private auth: AuthService,
    private userStore: UserstoreService,
    private toast: NgToastService
  ) {
    this.peer = new Peer();
    this.userStore.getIDfromStore().subscribe((id) => {
      this.UserID = id || this.auth.getIDfromToken();
      console.log(this.UserID);
    });
  }
  selectedUserName: any;
  selectedUserPeerId: any;
  isAuthenticated: any;
  async ngOnInit(): Promise<void> {
    this.isAuthenticated = false;
    this.signalRService.startConnection();
    this.time.setUTCHours(0, 0, 0, 0);
    this.startFlag = false;
    this.pauseFlag = false;

    this.getPeerId();
    this.selectedUserName = this.route.snapshot.paramMap.get('id');
    console.log(this.selectedUserName);

    console.log('asdasd');
    console.log(this.selectedUserName);
    await this.updatePeer();
    setTimeout(() => {
      this.checkProposal();
    }, 200);
  }

  isValidProposal: any;

  async checkProposal(): Promise<void> {
    this.isValidProposal = await this.signalRService.hubConnection.invoke(
      'isValidProposal',
      this.selectedUserName,
      this.auth.getUsernamefromToken()
    );

    setTimeout(() => {
      if (this.isValidProposal == false) {
        this.toast.info({
          detail: 'Alert',
          summary: 'This is a free session, no services with this user',
          duration: 3000,
        });
      } else {
        this.toast.info({
          detail: 'Alert',
          summary: 'This is a paid session',
          duration: 3000,
        });
      }
    }, 200);
  }

  private updatePeer() {
    setTimeout(() => {
      console.log('dddd');

      console.log(this.peerId);
      console.log(this.signalRService.hubConnection);

      this.signalRService.hubConnection.invoke(
        'updatePeerId',
        this.auth.getIDfromToken(),
        this.peerId
      );
    }, 1000);
  }

  private getPeerId = () => {
    this.peer.on('open', (id) => {
      this.peerId = id;
    });

    this.peer.on('call', (call) => {
      console.log('call');
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          this.lazyStream = stream;

          call.answer(stream);
          call.on('stream', (remoteStream) => {
            if (!this.peerList.includes(call.peer)) {
              this.streamRemoteVideo(remoteStream);
              this.currentPeer = call.peerConnection;
              this.peerList.push(call.peer);
              console.log('streem');
            }
          });
        })
        .catch((err) => {
          console.log(err + 'Unable to get media');
        });
    });
  };

  async connectWithPeer(): Promise<void> {
    this.selectedUserPeerId = await this.signalRService.hubConnection.invoke(
      'GetPeerIdByUserId',
      this.selectedUserName
    );
    console.log(this.selectedUserPeerId);

    await this.callPeer(this.selectedUserPeerId);
  }

  private callPeer(id: string): void {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.lazyStream = stream;

        const call = this.peer.call(id, stream);
        call.on('stream', (remoteStream) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });
      })
      .catch((err) => {
        console.log(err + 'Unable to connect');
      });
  }

  private streamRemoteVideo(stream: any): void {
    console.log('ASDASDASD');
    console.log(stream);

    const video = document.createElement('video');
    video.style.width="100%";
    video.style.height="100%";
    video.classList.add('video');
    video.srcObject = stream;
    video.play();
    document.getElementById('remote-video')!.innerHTML = '';
    document.getElementById('remote-video')?.append(video);
  }

  screenShare(): void {
    this.shareScreen();
  }

  private shareScreen(): void {
    // @ts-ignore
    navigator.mediaDevices
      .getDisplayMedia({
        // video: {
        //   cursor: 'always'
        // },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      })
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];
        videoTrack.onended = () => {
          this.stopScreenShare();
        };

        const sender = this.currentPeer
          .getSenders()
          .find((s: any) => s.track.kind === videoTrack.kind);
        sender.replaceTrack(videoTrack);
      })
      .catch((err) => {
        console.log('Unable to get display media ' + err);
      });
  }

  private stopScreenShare(): void {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer
      .getSenders()
      .find((s: any) => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }

  interval: any;
  time = new Date();
  startFlag: any;
  async startTimer(): Promise<void> {
    if (document.getElementById('remote-video')?.innerHTML != '') {
      this.pauseFlag = false;
      if (this.startFlag == false) {
        this.startFlag = true;
        this.interval = setInterval(() => {
          this.time.setSeconds(this.time.getSeconds() + 1);
        }, 1000);
      }

      await this.signalRService.hubConnection.invoke(
        'StartSession',
        this.selectedUserName,
        this.auth.getUsernamefromToken()
      );

      this.toast.success({
        detail: 'Success',
        summary: 'Session started',
        duration: 3000,
      });
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'No Calls found',
        duration: 3000,
      });
    }
  }

  pauseFlag: any;
  pauseTimer(): void {
    this.startFlag = false;
    if (this.pauseFlag == false) {
      this.pauseFlag = true;
      clearInterval(this.interval);
    }
  }

  resetTimer(): void {
    this.time.setSeconds(0);
  }

  async endSession(): Promise<void> {
    await this.signalRService.hubConnection.invoke(
      'EndSession',
      this.selectedUserName,
      this.auth.getUsernamefromToken()
    );
    this.toast.success({
      detail: 'Success',
      summary: 'Session has Ended, you can close the tab now',
      duration: 3000,
    });

    document.getElementById('remote-video')!.innerHTML = '';
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
