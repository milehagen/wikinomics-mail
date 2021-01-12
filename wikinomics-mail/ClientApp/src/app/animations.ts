import { animate, state, style, transition, trigger } from '@angular/animations';

export let slide = trigger('slide', [

    
    transition(':enter', [
      style({transform: 'translateY(100px)', opacity: 0}),
      animate('400ms 600ms')
    ]),

    transition(':leave', [
        animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
    ])
]);