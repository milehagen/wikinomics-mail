import { animate, state, style, transition, trigger } from '@angular/animations';

export let fade = trigger('fade', [
    transition('void => *', [
      style({opacity: 0}),
      animate('400ms 500ms')
    ]),

    transition('* => void', [
        animate('500ms', style({opacity: 0}))
    ])
]);