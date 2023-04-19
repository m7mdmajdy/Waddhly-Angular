import { IPosts } from './../../Modals/iposts';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  thePosts: IPosts[] = [
    {
      postid: 0,
      postTitle: '',
      postuserid: 0,
      postusername: '',
      postDate: new Date(),
      comments: [
        {
          item1: '',
          item2: 0,
          item3: '',
          item4: new Date(),
        },
      ],
    },
  ];
  posts: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(`${environment.apiUrl}/Comment`).subscribe((posts) => {
      this.posts = posts;
      for (let i = 0; i < this.thePosts.length; i++) {
        this.thePosts[i] = this.posts[i];

        for (let j = 0; j < this.posts[i]?.comments.length; j++) {
          this.thePosts[i].comments[j] = this.posts[i]?.comments[j];
        }
      }
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
  subString(subString: string, num: number): string {
    if (subString.length > num) {
      return subString.substring(0, num) + '...';
    }
    return subString.substring(0, num);
  }
}
