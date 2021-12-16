import { FormGroup } from '@angular/forms';

export function getDirtyValues<T extends Record<string, unknown>>(form: FormGroup): T {
    return Object.keys(form.controls).reduce((dirtyValues, key) => {
        const currentControl = form.controls[key];
        console.log(key, currentControl.dirty, currentControl.value);
        if (currentControl.dirty) {
            // if ((currentControl as FormGroup).controls) {
            //     dirtyValues[key] = this.getDirtyValues<>(currentControl);
            // } else {
            dirtyValues[key as keyof typeof dirtyValues] = currentControl.value;
            // }
        }
        return dirtyValues;
    }, {} as T);
}
