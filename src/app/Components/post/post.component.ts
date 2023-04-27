import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/auth/User/user.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: any;
  UserID: any;
  currentUserId: number = 0;
  now: Date;
  comment: any;
  currentPostId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private user: UserService,
    private userStore: UserstoreService,
    private auth: AuthService
  ) {
    this.currentPostId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentPostId);
    this.httpClient
      .get(`${environment.apiUrl}/Comment/${this.currentPostId}`)
      .subscribe((p) => {
        this.post = p;
        console.log(p);
      });
    this.now = new Date();
  }
  ngOnInit(): void {
    console.log(this.post);
    this.userStore.getIDfromStore().subscribe((id) => {
      this.UserID = id || this.auth.getIDfromToken();
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
  addComment() {
    this.comment = {
      commentdescription: this.comment,
      commentdate: this.now,
      commentUserId: this.UserID,
    };
    return this.httpClient
      .post(
        `${environment.apiUrl}/Comment?id=${this.currentPostId}`,
        this.comment
      )
      .subscribe((c) => {
        this.httpClient
          .get(`${environment.apiUrl}/Comment/${this.currentPostId}`)
          .subscribe((p) => {
            this.post = p;
            console.log(p);
          });
        this.comment = '';
      });
  }
  goDown() {
    document.getElementById('comment')?.focus();
    window.scrollTo(0, document.body.scrollHeight);
  }
}
