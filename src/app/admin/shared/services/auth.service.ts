import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interfaces';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  public errors$: Subject<string> = new Subject<string>()
  userId: string   //   public userId = (this.router.url.toString()).split('/')[1].toString()

  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    //this.userId = 'posts'
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.errors$.next('Email не найден')
        break
      case 'INVALID_EMAIL':
        this.errors$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.errors$.next('Неверный пароль')
        break
    }

    return throwError(error)
  }

  private setToken(responce: FbAuthResponse | null) {
    if (responce) {
      // console.log("TOKEN", this.token)
      // console.log("responce", responce)
      localStorage.setItem('localId', responce.localId)
      const expDate = new Date(new Date().getTime() + +responce.expiresIn * 1000)
      localStorage.setItem('fb-token', responce.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }

  createUser(user) {
    //console.log(user);
    return this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }
}
