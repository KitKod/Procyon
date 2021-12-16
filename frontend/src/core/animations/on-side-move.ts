import { animate, state, style, transition, trigger } from '@angular/animations';

export const onTextAppear = trigger('onTextAppear', [
    transition('open => void', [animate('250ms ease-in'), style({ width: 0 })]),
    transition('* => open', [style({ width: 0 }), animate('250ms ease-in'), style({ width: '100%' })]),
]);
