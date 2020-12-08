import { Component, OnInit } from '@angular/core';
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faKey = faKey;
  faEnvelope = faEnvelope;

  public form: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(user)
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

  public get email() {
    return this.form.get('email').value;
  }

  public get password() {
    return this.form.get('password').value;
  }
}
