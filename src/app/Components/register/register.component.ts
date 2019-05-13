import { Component, OnInit } from '@angular/core';
import { MatInput, MatFormField, MatFormFieldControl } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUserForm = this.fb.group({
    fullName: ['', Validators.required],
    idNumber: ['', Validators.required],
    email: ['', Validators.required],
    userName: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', Validators.required],
    passwwordVerify: ['', Validators.required],
    optional: this.fb.group({
      dateOfBirth: [''],
      image: ['']
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
