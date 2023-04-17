import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Peer from 'peerjs';
import { ChatService } from 'src/app/Services/ChatService/chat-service.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  private peer: Peer;
  peerIdShare: string="";
  peerId:string="";
  private lazyStream: any;
  currentPeer: any;
  private peerList: Array<any> = [];

  constructor(private route:ActivatedRoute, private signalRService:ChatService, private auth: AuthService) {
    this.peer = new Peer();
  }   
  selectedUserName:any ;
  selectedUserPeerId:any ;
  
  async ngOnInit(): Promise<void> {
    this.signalRService.startConnection();
    this.getPeerId();
    this.selectedUserName=this.route.snapshot.paramMap.get('id');
    console.log(this.selectedUserName);
    
    
    console.log("asdasd");
    console.log(this.selectedUserName);
    await this.updatePeer();

  }
  private updatePeer(){
    setTimeout(() => {
      console.log("dddd");
      
      console.log(this.peerId);
      console.log(this.signalRService.hubConnection);
      
      this.signalRService.hubConnection
    .invoke("updatePeerId", this.auth.getIDfromToken(), this.peerId);
    }, 1000);

  }

  private getPeerId = () => {
    this.peer.on('open', (id) => {
      this.peerId = id;
      
    });

    this.peer.on('call', (call) => {
      console.log("call");
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream;

        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
            console.log("streem");
            
          }
        });
      }).catch(err => {
        console.log(err + 'Unable to get media');
      });
    });
  }


  async connectWithPeer(): Promise<void> {
    this.selectedUserPeerId = await this.signalRService.hubConnection
    .invoke("GetPeerIdByUserId", this.selectedUserName);
  console.log(this.selectedUserPeerId);

    await this.callPeer(this.selectedUserPeerId);
  }

  private callPeer(id: string): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream;

      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) => {
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream);
          this.currentPeer = call.peerConnection;
          this.peerList.push(call.peer);
        }
      });
    }).catch(err => {
      console.log(err + 'Unable to connect');
    });
  }


  private streamRemoteVideo(stream: any): void {
    console.log("ASDASDASD");
    console.log(stream);
    
    const video = document.createElement('video');
    video.classList.add('video');
    video.srcObject = stream;
    video.play();
    document.getElementById('remote-video')!.innerHTML="";
    document.getElementById('remote-video')?.append(video);
  }


  screenShare(): void {
    this.shareScreen();
  }

  private shareScreen(): void {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({
      // video: {
      //   cursor: 'always'
      // },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then(stream => {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        this.stopScreenShare();
      };

      const sender = this.currentPeer.getSenders().find((s:any) => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }).catch(err => {
      console.log('Unable to get display media ' + err);
    });
  }

  private stopScreenShare(): void {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer.getSenders().find((s:any) => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }

}
