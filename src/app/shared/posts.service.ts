import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbCreateResponse, Post} from './interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../admin/shared/services/auth.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {

  public errors$: Subject<string> = new Subject<string>()

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router
  ) {}

  private handleError(error: HttpErrorResponse) {
    //ТУТ НЕОБХОДИМО ОБРАБОТАТЬ ОШИБКУ.

    //console.log("ERRRRRROR", error)
    return []
  }

  create(post: Post): Observable<Post>{
    // console.log('create', `${environment.fbDbUrl}/${localStorage.getItem('localId')}.json`)
    return this.http.post(`${environment.fbDbUrl}/${localStorage.getItem('localId')}.json`, post)
      .pipe(map((responce: FbCreateResponse) => {
        return {
          ...post,
          id: responce.name,
          date: new Date(post.date)
        }
      }))
  }

  getAll(): Observable<Post[]> {
    // console.log('getAll', `${environment.fbDbUrl}/${localStorage.getItem('localId')}.json`)
    return this.http.get(`${environment.fbDbUrl}/${localStorage.getItem('localId')}.json`)
      .pipe(map((response: {[key: string]: any}) => {

        //console.log("response", response)
        if (response === null) {}
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
    }),
        catchError(this.handleError.bind(this))
      )
  }

  getAllUnAuth(): Observable<Post[]> {
    let userId = (this.router.url.toString()).split('/')[2].toString()
    // console.log('getAllUnAuth', `${environment.fbDbUrl}/${userId}.json`)
    return this.http.get(`${environment.fbDbUrl}/${userId}.json`)
      .pipe(map((response: {[key: string]: any}) => {
        // console.log("response", response)
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }),
        catchError(this.handleError.bind(this))
      )
  }

  remove(id: string): Observable<void> {
    // console.log('remove', `${environment.fbDbUrl}/${localStorage.getItem('localId')}/${id}.json`)
    return this.http.delete<void>(`${environment.fbDbUrl}/${localStorage.getItem('localId')}/${id}.json`)
  }

  getById(id: string): Observable<Post> {
    // console.log('getById', `${environment.fbDbUrl}/${this.auth.userId}/${id}.json`)
    return this.http.get<Post>(`${environment.fbDbUrl}/${localStorage.getItem('localId')}/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
  }

  getByIdUnAuth(id: string): Observable<Post> {
    let userId = (this.router.url.toString()).split('/')[2].toString()
    // console.log('URL ALL',(this.router.url.toString()).split('/'))
    // console.log('getByIdUnAuth', `${environment.fbDbUrl}/${userId}/${id}.json`)
    return this.http.get<Post>(`${environment.fbDbUrl}/${userId}/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
  }

  update(post: Post): Observable<Post> {
    // console.log('update', `${environment.fbDbUrl}/${localStorage.getItem('localId')}/${post.id}.json`)
    return this.http.patch<Post>(`${environment.fbDbUrl}/${localStorage.getItem('localId')}/${post.id}.json`, post)
  }
}
