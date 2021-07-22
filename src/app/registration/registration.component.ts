import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AuthenticationService],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup ;
  loading = false;
  submitted = false;
  error: string | undefined;
  success: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authservice:AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }


  ngOnInit(): void {
    if (this.authservice.IsAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    const user = { UserName: this.registerForm.controls['username'].value, Password: this.registerForm.controls['password'].value, Fullname: this.registerForm.controls['fullname'].value };
    this.authservice.UserRegistarion(user)
        .pipe(first())
        .subscribe(
            res => {
             this.success = res.value.value
             this.registerForm.reset();
             this.loading = false;
            },
            error => {
                this.error = error.error.value.value;
                this.loading = false;
            });
}

}
