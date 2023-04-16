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
        // this.thePosts[i].postId = this.posts[i]?.postId;
        // this.thePosts[i].postTitle = this.posts[i]?.postTitle;
        // this.thePosts[i].comments = this.posts[i]?.comments;
        this.thePosts[i] = this.posts[i];

        for (let j = 0; j < this.posts[i]?.comments.length; j++) {
          // this.thePosts[i].comments[j].item1 =
          //   this.posts[i]?.comments[j].item1;
          // this.thePosts[i].comments[j].item2 =
          //   this.posts[i]?.comments[j].item2;
          this.thePosts[i].comments[j] = this.posts[i]?.comments[j];
        }
        //console.log(this.posts[i]?.comments.length);
        // console.log(this.posts[i]?.comments);
        // console.log(this.thePosts.length);
      }
    });
    // console.log(this.posts);
    // console.log(this.thePosts);
  }
}
