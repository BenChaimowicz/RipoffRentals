import { Component, OnInit } from '@angular/core';
import { MatInput, MatFormField, MatFormFieldControl } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Gender } from '../../Models/Users.class';
import { RegistrationValidators } from '../../Validators/Password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUserForm = this.fb.group({
    fullName: ['', Validators.required],
    idNumber: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    userName: ['', Validators.required],
    gender: ['', Validators.required],
    passwords: this.fb.group({
      password: ['', [Validators.required, RegistrationValidators.cannotContainSpace]],
      passwordVerify: ['', [Validators.required]],
    }, {validators: [RegistrationValidators.mustBeSameAs]}),
    optional: this.fb.group({
      dateOfBirth: [''],
      image: ['']
    })
  });

  genderArray: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.populateGender();
  }

  onSubmit() {}

  populateGender() {

    const len = Object.keys(Gender).length;

    for (let i = 0; i <= Object.keys(Gender).length / 2; i++) {
      this.genderArray.push(Object.keys(Gender)[len - i]);
    }
  }
}