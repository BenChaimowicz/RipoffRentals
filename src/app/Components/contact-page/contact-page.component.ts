import { RegistrationValidators } from './../../Validators/Registration.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  contactUsForm = this.fb.group({
    fullName: ['', [
      Validators.required,
      Validators.pattern(RegistrationValidators.fullNamePattern),
      Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.contactUsForm.value);
  }
}
