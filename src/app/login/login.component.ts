import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;
  loading = false;
  submitted = false;
  error: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authservice: AuthenticationService
  ) 
  {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }


  ngOnInit(): void {
   
    if (this.authservice.IsAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    const user = { UserName: this.loginForm.controls['username'].value, Password: this.loginForm.controls['password'].value };
    this.authservice.Login(user)
        .subscribe(
            data => {
                this.router.navigate(['/dashboard']);
            },
            error => {
                this.error = error.error.value.value;
                this.loading = false;
            });
}
}
