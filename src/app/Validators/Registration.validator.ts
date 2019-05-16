import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RegistrationValidators {
  static fullNamePattern = '^([a-zA-Z]+|[a-zA-Z]+\\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\\s{1}[a-zA-Z]{3,}\\s{1}[a-zA-Z]{1,})$';
  static numbersOnlyPattern = '[0-9]*';
  static userNamePattern = '^[a-zA-Z0-9_-]{3,20}$';

  static cannotContainSpace(control: AbstractControl): ValidationErrors {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  static mustBeSameAs(control: AbstractControl): ValidationErrors {
    if ((control.get('passwordVerify').value) !== (control.get('password').value)) {
      control.get('passwordVerify').setErrors({ passwordsDontMatch: true });
      return { passwordsDontMatch: true };
    }
    control.get('passwordVerify').setErrors(null);
    return null;
  }

  static overEighteen(control: AbstractControl): ValidationErrors {
    const inputData = Date.parse(control.value);
    if (isNaN(inputData) === true) {
      return { invalidDateFormat: true };
    }
    const dob: Date = control.value;
    const today: Date = new Date();
    const diff: number = today.getFullYear() - dob.getFullYear();

    if (diff < 18) {
      return { minimumAge: 18 };
    }
    return null;
  }
}
