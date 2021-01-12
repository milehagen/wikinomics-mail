import { animate, state, style, transition, trigger } from '@angular/animations';

export let slide = trigger('slide', [

    
    transition('void => *', [
      style({transform: 'translateY(100px)', opacity: 0}),
      animate('500ms 500ms')
    ]),

    transition('* => void', [
        animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
    ])
]);