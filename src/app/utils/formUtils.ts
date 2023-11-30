import {
  AbstractControl,
  AsyncValidatorFn,
  Form,
  FormGroup,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, debounceTime, filter, map, switchMap, take } from 'rxjs';
import { Utils } from './utils';

export class FormUtils {
  //
  static verifyStringWithStar(inputDate: string): boolean {
    return Utils.regexTest(/^(?![*])[a-zA-Z]+$/, inputDate);
  }

static verifyNineDigit(inputDate : string): boolean {
  return Utils.regexTest(/^[0-9]{9}$/, inputDate);
}


  static instanceOfObject(value: any) {
    return (
      !!value && // truthy
      typeof value === 'object'
    );
  }

  static letterWithStarValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (control?.value) {
      const stringValue = control.value;
      if (!this.verifyStringWithStar(stringValue)) {
        control.setErrors({invalid: true})
        return { invalid: true };
      }
      return null;
    }
    return null;
  };

  static referenceValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (control?.value) {
      const stringValue = control.value;
      if (!this.verifyNineDigit(stringValue)) {
        control.setErrors({ invalid: true });
        return { invalid: true };
      }
      return null;
    }
    return null;
  };

  static SelectionRequiredValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return !this.instanceOfObject(control?.value) ? { invalid: true } : null;
  };

  static toggleRequiredValidator(
    control: AbstractControl,
    addOrClear: boolean
  ) {
    this.toggleValidators(control, addOrClear, [Validators.required]);
  }

  static toggleValidators(
    control: AbstractControl,
    addOrClear: boolean,
    validators: ValidatorFn[]
  ) {
    if (addOrClear) {
      control.addValidators(validators);
    } else {
      control.removeValidators(validators);
    }

    control.updateValueAndValidity();
  }

  static printFormValues(form: UntypedFormGroup) {
    const controls = form.controls;
    for (const name in controls) {
      console.log(name, controls[name]?.value);
    }
  }

  static printFormErrors(form: UntypedFormGroup) {
    const errors = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        errors.push({ name: name, error: controls[name].errors });
      }
    }

    console.log(errors);
  }

  // static FteValidator(
  //   yearStartedName: string,
  //   yearFinishedName: string,
  //   lengthOfStudyName: string
  // ): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const yearStartedControl = control.get(yearStartedName);
  //     const yearFinishedControl = control.get(yearFinishedName);
  //     const lengthOfStudyControl = control.get(lengthOfStudyName);

  //     if (lengthOfStudyControl?.value != null) {
  //       const yearStarted = Number(yearStartedControl?.value);
  //       const yearFinished = Number(yearFinishedControl?.value);
  //       const lengthOfStudy = Number(lengthOfStudyControl?.value);

  //       if (
  //         yearStarted &&
  //         yearFinished &&
  //         lengthOfStudy > yearFinished - yearStarted + 1
  //       ) {
  //         lengthOfStudyControl.setErrors({ invalid: true });
  //         return { invalid: true };
  //       } else if (
  //         lengthOfStudy < 0.01 ||
  //         !Utils.regexTest(
  //           AppConstants.DOUBLE_DIGIT_DECIMAL_REGEX,
  //           lengthOfStudyControl?.value
  //         )
  //       ) {
  //         lengthOfStudyControl.setErrors({ positiveInvalid: true });
  //         return { positiveInvalid: true };
  //       }
  //     }
  //     return null;
  //   };
  // }

  static RangeGreaterRequiredValidator(
    yearCommenced: string,
    yearFinished: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const yearCommencedControl = control.get(yearCommenced);
      const yearFinishedControl = control.get(yearFinished);

      if (
        !yearCommencedControl ||
        !yearFinishedControl ||
        !yearCommencedControl.value ||
        !yearFinishedControl.value
      ) {
        return null;
      }

      if (yearCommencedControl.value > yearFinishedControl.value) {
        yearFinishedControl.setErrors({ invalid: true });
        return { invalid: true };
      } else {
        yearFinishedControl.setErrors(null);
        return null;
      }
    };
  }

  static RangeDurationYearsCheckValidator(
    yearCommenced: string,
    yearFinished: string,
    durationYears: string,
    durationMonths: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const yearCommencedControl = control.get(yearCommenced);
      const yearFinishedControl = control.get(yearFinished);
      const durationYearsControl = control.get(durationYears);
      const durationMonthsControl = control.get(durationMonths);

      if (
        !yearCommencedControl ||
        !yearFinishedControl ||
        !durationYearsControl ||
        !durationMonthsControl ||
        !yearCommencedControl.value ||
        !yearFinishedControl.value ||
        durationYearsControl.value === null ||
        durationYearsControl.value === undefined
      ) {
        return null;
      }

      const durationMonthsValue = durationMonthsControl.value ?? 0;
      var expectedMaxMonths =
        (yearFinishedControl.value - yearCommencedControl.value + 1) * 12;

      // if end year is current year, then allow months only until current month
      if (yearFinishedControl.value == new Date().getFullYear()) {
        expectedMaxMonths =
          (yearFinishedControl.value - yearCommencedControl.value) * 12 +
          new Date().getMonth() +
          1;
      }

      if (
        durationYearsControl.value * 12 + durationMonthsValue >
        expectedMaxMonths
      ) {
        durationYearsControl.setErrors({ invalid: true });
        return { invalid: true };
      } else {
        durationYearsControl.setErrors(null);
        return null;
      }
    };
  }

  // static NoAngleBracketValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (Utils.regexTest(/<|>/, control.value)) {
  //       return { angleError: true };
  //     }

  //     return null;
  //   };
  // }

  static setValues(form: UntypedFormGroup, val: any) {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].setValue(val);
    });
  }

  static resetIfInvalid(form: FormGroup, controlName: string, list: any[]) {
    const val = form.controls[controlName].value;

    if (val !== null && !list.find((m) => m == val)) {
      form.controls[controlName].reset();
    }
  }

  static reset(form: FormGroup, controlName: string) {
    form.controls[controlName].reset();
  }

  // static UsiValidator: ValidatorFn = (
  //   control: AbstractControl
  // ): ValidationErrors | null => {
  //   if (!control?.value) {
  //     return null;
  //   }
  //   return Utils.verifyUsi(control?.value) ? null : { invalid: true };
  // };

  static scrollToError(): void {
    const firstElementWithError = document.querySelector(
      'mat-form-field.ng-invalid'
    );

    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  static EmailPwdValidator(email: string, password: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Can't access email/pwd control without visiting 'parent' prop
      const emailControl = control.parent?.get(email);
      const passwordControl = control.parent?.get(password);

      if (!emailControl || !passwordControl || !control.value) {
        return null;
      }
      const name = control.value;
      if (name.toLowerCase() === emailControl.value?.toLowerCase()) {
        return { isEmailMatch: true };
      }
      if (name.toLowerCase() === passwordControl.value?.toLowerCase()) {
        return { isPwdMatch: true };
      }
      return null;
    };
  }
}
