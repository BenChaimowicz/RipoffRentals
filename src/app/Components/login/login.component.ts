import { Component, OnInit, Inject } from '@angular/core';
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
  userName: string;
  password: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
// tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      maxWidth: '300px',
      minHeight: '200px',
      data: {userName: this.userName, password: this.password }
    });
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent {

  icon = 'visibility';
  isMasked = true;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeIcon() {
    this.icon = this.icon === 'visibility' ? 'visibility_off' : 'visibility';
    this.isMasked = this.icon === 'visibility' ? true : false;
  }

}
