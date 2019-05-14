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
      return { mustBeSameAs: true };
    }
    return null;
  }
}
