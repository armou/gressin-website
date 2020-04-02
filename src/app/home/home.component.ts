import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-home',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('mySlideDownTrigger', [
      transition(':enter', [
        query('.grid-item', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ]),
      transition(':leave', [
        query('.grid-item', [
          style({opacity: 1}),
          stagger(-30, [
            animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('openClose', [
      state('open',
        style({})),
      state('closed', 
        style({transform: 'translateY(110vh) rotate(180deg)', opacity: 1})),
      transition('closed => open', [
        animate(1000)
      ]),
      transition('open => closed', [
        animate(1000, style({ transform: 'translateY(110vh) rotate(180deg)' }))
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faChevronDown = faChevronDown;
  isShown = false;
  isOpen = true;

  constructor() { }

  ngOnInit() {
  }

  showProfile() {
    console.log('toto');
  }

  toggle($element) {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    this.isShown = !this.isShown;
    this.isOpen = !this.isOpen;
  }

}
