import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RegistrationValidators {
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
    return { passwordsDontMatch: null };
  }

  static onlyNumbers(control: AbstractControl): ValidationErrors {
    const regex = new RegExp('/^[0-9]+$/');
    if (!regex.test(control.value as string)) {
      console.log('no');
      return { invalidCharacters: true };
    }
    console.log('yes');
    control.setErrors(null);
    return null;
  }
}
