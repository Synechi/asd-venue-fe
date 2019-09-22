//Chantel - For password validation
import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
 
@Directive({
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting:CompareValidatorDirective, multi: true }]
})
 
export class CompareValidatorDirective implements Validator {
    @Input() compare: string;
    validate(control: AbstractControl): {[key: string]: any} | null{
        const controlToCompare = control.parent.get(this.compare);
        if ( controlToCompare && controlToCompare.value !== control.value)
        {
            return {'notMatched': true};
        }
        return null;
    }
}