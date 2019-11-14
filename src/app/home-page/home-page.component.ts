import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';
import {AuthService} from '../admin/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>

  constructor(private postsService: PostsService,
              public auth: AuthService) { }

  ngOnInit() {
    //console.log("USER ID:", this.auth.userId)
    //this.posts$ = this.postsService.getAll()
    this.posts$ = this.postsService.getAllUnAuth()
  }

}
