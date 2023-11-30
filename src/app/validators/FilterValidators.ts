import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export class FilterValidators {
  static atLeastOneFilter(
    dob: string,
    surname: string,
    givens: string,
    reference: string,
    courseCode: string,
    cycle: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dobControl = control.get(dob);
      const surnameControl = control.get(surname);
      const givensControl = control.get(givens);
      const referenceControl = control.get(reference);
      const courseCodeControl = control.get(courseCode);
      const cycleControl = control.get(cycle);

      if (referenceControl?.value !== null && referenceControl?.value!=='') {
        return null;
      } else {
        if (
          (dobControl?.value == null || dobControl?.value=='')
          && (surnameControl?.value == null || surnameControl?.value=='')
          && (givensControl?.value == null ||givensControl?.value == '')
          &&(courseCodeControl?.value==null || courseCodeControl?.value=='')
          && (cycleControl?.value==null || cycleControl?.value=='')
        ) {
          return { atLeastOneRequired: false };
        }
      }
      return null;
    };
  }
}
