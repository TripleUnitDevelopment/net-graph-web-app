import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton as MatButton } from '@angular/material/button';
import { MatProgressBar as MatProgressBar } from '@angular/material/progress-bar';
import { Validators, UntypedFormGroup, UntypedFormControl, FormControl, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from 'app/shared/services/http/user.service';
import { AuthService } from 'app/shared/services/http/common/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup5',
  templateUrl: './signup5.component.html',
  styleUrls: ['./signup5.component.scss']
})
export class Signup5Component {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: UntypedFormGroup
  errorMsg = '';
  isLoading: boolean = false;
  constructor(private userService: UserService, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required),
    }, { validators: this.MustMatch('password', 'passwordConfirmation') });
  }

  MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = (formGroup as FormGroup).controls[controlName];
      const matchingControl = (formGroup as FormGroup).controls[matchingControlName];

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        return { mustMatch: true };
      }

      return null;
    };
  }

  signup() {
    const signupData = this.signupForm.value;
    console.log(signupData);

    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';
    this.isLoading = true;

    const model = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };
    console.log("signing up", model);
    this.userService.Signup(model).subscribe((res: any) => {
      console.log(res);
      this.authService.setToken(res.userToken);
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.submitButton.disabled = false;
      // this.progressBar.mode = 'determinate';
      this.errorMsg = error.message;
    });
  }
}
