import { AbstractControl, ValidationErrors, ValidatorFn ,FormGroup} from "@angular/forms";

export class FilterValidators {
    static atLeastOneFilter(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormGroup)) {
                return null; // Validation doesn't apply to non-FormGroup controls
            }

            const formGroup = control as FormGroup;
            const controls = formGroup.controls;
            let hasValue = false;
  
            Object.keys(controls).forEach(key => {
                const currentValue = controls[key].value;
                if (currentValue !== null && currentValue !== undefined && currentValue !== '') {
                    hasValue = true;
                }
            });

            return hasValue ? null : { atLeastOneRequired: true };
        };
    }
}
