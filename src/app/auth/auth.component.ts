import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private loginService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.emailLogin(this.email, this.password);
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email == undefined || password == undefined || email.length === 0 || password.length < 6) {
      document.getElementById('invalidInf').innerHTML = 'The password or User is invalid!';
      return false;
    }
    return true;
  }

  emailLogin(email: string, password: string) {
    this.loginService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/home']))
        .catch( error => {
          console.log(error);
          this.router.navigate(['/auth']);
          document.getElementById('invalidInf').innerHTML = 'The password or user is invalid!';
        });
  }

  logout() {
    this.loginService.signOut();
  }

  createUser() {
    this.loginService.emailSignUp(this.email, this.password);
  }
}

