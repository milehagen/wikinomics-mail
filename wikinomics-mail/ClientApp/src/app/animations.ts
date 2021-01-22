import { animate, state, style, transition, trigger } from '@angular/animations';

export let slide = trigger('slide', [

    
    transition('void => *', [
      style({opacity: 0}),
      animate('400ms 500ms')
    ]),

    transition('* => void', [
        animate('500ms', style({opacity: 0}))
    ])
]);