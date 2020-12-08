import { Component, OnInit } from '@angular/core';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;

  public form: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public logIn() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.login(user)
      .subscribe((res) => {
        if (res['success']) {
          localStorage.setItem('accessToken', res['accessToken'].toString());
          localStorage.setItem('username', res['username'].toString());
          this.router.navigate(['/']);
          this.authService.username = res['username'];
          this.authService.loggedIn = true;
        }
      }, (error) => {
        const errorMessage = error.error.error;
        window.alert(errorMessage);
      });

    this.form.reset();
  }

  public get username() {
    return this.form.get('username').value;
  }

  public get password() {
    return this.form.get('password').value;
  }
}
