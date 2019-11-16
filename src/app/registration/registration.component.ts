import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from "../admin/shared/services/auth.service";
import {User} from "../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  authError: any;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
  }

  createUser(frm) {

    if (frm.value.password === frm.value.confirmed) {



      let value
      let authoris = this.auth
      let rout = this.router

      this.auth.createUser(frm.value)
      //когда пользователь создан, авторизую его и навигирую
        .then(function(value) {
          // выполнение
          const user: User = {
            email: frm.value.email,
            password: frm.value.password
          }

          authoris.login(user).subscribe(responce => {
            authoris.userId = responce.localId
            frm.reset()
            rout.navigate((['/admin', 'create']))
          }, () => {
          })

        }, function(reason) {
          // отказ
        });
    } else {
      alert("ПАРОЛЬ НЕ ПОДТВЕРЖДЕН, ПОЖАЛУЙСТА ПОДТВЕРДИТЕ")
    }
  }
}
