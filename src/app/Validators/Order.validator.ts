import { ValidationErrors, FormGroup } from '@angular/forms';

export class OrderValidation {
  public static checkDates(group: FormGroup): ValidationErrors {
    if (group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid: true };
    }
    return null;
  }
}
