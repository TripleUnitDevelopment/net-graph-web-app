import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton as MatButton } from '@angular/material/button';
import { MatProgressBar as MatProgressBar } from '@angular/material/progress-bar';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { UserService } from 'app/shared/services/http/user.service';
import { AuthService } from 'app/shared/services/http/common/auth-service';

@Component({
  selector: 'app-signin5',
  templateUrl: './signin5.component.html',
  styleUrls: ['./signin5.component.scss']
})
export class Signin5Component {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: UntypedFormGroup;
  errorMsg = '';
  // return: string;

  isLoading: boolean = false;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private authService: AuthService,
    private egretLoader: AppLoaderService,
    private router: Router,
    private userService: UserService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required, Validators.pattern('^.{8,}$')]),
      rememberMe: new UntypedFormControl(false)
    });

    // this.route.queryParams
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(params => this.return = params['return'] || '/');
  }

  ngAfterViewInit() {
    // this.autoSignIn();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  signin() {
    this.isLoading = true;
    const signinData = this.signinForm.value;
    console.log(signinData);

    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';

    const model = {
      userEmail: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    console.log(model);

    this.userService.Signin(model).subscribe((res: any) => {
      console.log(res);
      this.isLoading = false;
      this.authService.setToken(res.userToken);
      this.router.navigate(['/home']);
    }, error => {
      this.isLoading = false;
      console.log(error);
      this.submitButton.disabled = false;
      // this.progressBar.mode = 'determinate';
      this.errorMsg = error.error.error.message;
      setTimeout(() => {
        this.errorMsg = null;
      }, 4000);
    });
  }

  // autoSignIn() {
  //   if (this.jwtAuth.return === '/') {
  //     return
  //   }
  //   this.egretLoader.open(`Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(0, 20)}...`, { width: '320px' });
  //   setTimeout(() => {
  //     this.signin();
  //     console.log('autoSignIn');
  //     this.egretLoader.close()
  //   }, 2000);
  // }

}
