import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  title: string = '';
  description: string = '';
  UserID: any;
  now: Date = new Date();
  post: any;

  constructor(
    private httpClient: HttpClient,
    private userStore: UserstoreService,
    private auth: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    console.log(this.post);
    this.userStore.getIDfromStore().subscribe((id) => {
      this.UserID = id || this.auth.getIDfromToken();
    });
  }

  addPost() {
    debugger;
    this.post = {
      title: this.title,
      description: this.description,
      date: this.now,
      userId: this.UserID,
    };

    return this.httpClient.post(`${environment.apiUrl}/Post`, this.post).subscribe(data => {
      this.router.navigate(['/posts']);
    });
  }
}
