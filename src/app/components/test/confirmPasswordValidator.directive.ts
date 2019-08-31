import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive ({
    selector: '[compare]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmPasswordValidatorDirective,
        multi: true
    }]
})
export class ConfirmPasswordValidatorDirective implements Validator {
    @Input('compare') appConfirmPasswordValidator : string;

    validate(control: AbstractControl): ValidationErrors | null {
        const controlToCompare = control.root.get(this.appConfirmPasswordValidator);
       // if (control.value == null || control.value.length === 0 ) {
            
        //    return null;
       // }
        // const controlToCompare = control.root.get(this.appConfirmPasswordValidator);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                control.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !==control.value ? { 'compare': true } : null;

        // const controlToCompare = control.parent.get(this.appConfirmPasswordValidator);
        // console.log('gflus bvyustfuysdbfcysd')
        // if (controlToCompare && controlToCompare.value !== controlToCompare.value) {
        //     console.log('gflus bvyustfuysdbfcysd')
        //     return { 'notEqual': true };
        // }
        // return null;
    }
}