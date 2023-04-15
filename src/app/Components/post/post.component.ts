import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  currentPostId: number = 0;
  constructor(private route: ActivatedRoute) {
    this.currentPostId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentPostId);
  }
}
