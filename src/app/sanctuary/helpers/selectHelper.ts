
import { FormControl } from '@angular/forms';

export function notChoose(control: FormControl) {
    const val: string = control.value;
    if (val === 'Choose...') {
        return { notChoose: true };
    }
    return null;
}
