import { animate, state, style, transition, trigger } from '@angular/animations';

export let slide = trigger('slide', [

    state('void', style({opacity: 0})),

    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate(500)
    ])
]);