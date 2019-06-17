import { ImageHelper } from './../../helpers/imageHelper';
import { AlertService, Alert } from './../../services/alert.service';
import { LoginService } from './../../services/login.service';
import { RegistrationValidators } from './../../Validators/Registration.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import {
  MatButton,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatInput,
  MatFormField,
  MatFormFieldControl
} from '@angular/material';

export interface DialogData {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  fullName: string;
  userName: string;
  password: string;

  currUserFullName: string;
  currUserImage: string;

  constructor(public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.userLoggedIn.subscribe(user => {
      if (user !== null) {
        this.loggedIn = true;
      }
      this.currUserFullName = user.fullName;
      if (user.image !== null) {
        this.currUserImage = ImageHelper.getSrcFromBase64(user.image);
      } else { this.currUserImage = ''; }
    });
  }

  openDialog() {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      maxWidth: '300px',
      minHeight: '200px',
      data: { userName: this.userName, password: this.password }
    });
  }

  onLogOut() {
    this.loginService.logOut();
    this.loggedIn = false;
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent {

  @Output() loggedIn = new EventEmitter();

  icon = 'visibility';
  isMasked = true;
  signInForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern(RegistrationValidators.userNamePattern)]),
    password: new FormControl('', Validators.required)
  });


  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private loginService: LoginService,
    private alertService: AlertService) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeIcon() {
    this.icon = this.icon === 'visibility' ? 'visibility_off' : 'visibility';
    this.isMasked = this.icon === 'visibility' ? true : false;
  }

  async onSignIn() {
    let validTry: boolean;
    if (this.signInForm.valid) {
      validTry = await this.loginService.loginUser(this.signInForm.value.userName, this.signInForm.value.password);
    }
    if (validTry) {
      let success = false;
      if (this.loginService.getCurrentUser() !== null) {
        success = true;
      }
      const alert: Alert = new Alert();
      alert.message = success ? `Welcome!` : 'Login Failed';
      this.alertService.subject.next(alert);
      this.dialogRef.close();
    }
  }
}
