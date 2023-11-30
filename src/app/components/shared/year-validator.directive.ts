import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const yearValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  if (!value || typeof value !== 'string') {
    return null;
  }

  const regex = /^\d{4}$/; // This regex checks if the string has exactly 4 digits

  return regex.test(value) ? null : { year: true };
};
