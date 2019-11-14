import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../interfaces';
import {AuthService} from '../../../admin/shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post
  userId = ''

  constructor(public auth: AuthService, private router: Router) {
    this.userId = (this.router.url.toString()).split('/')[2].toString()
  }

  ngOnInit() {
  }

  setlinks() {
    this.userId = (this.router.url.toString()).split('/')[2].toString()
    // console.log('zzzzzzz',(this.userId))
    // console.log('yyyyyyy',(this.post.id))

  }
}
