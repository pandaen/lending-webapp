import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-addentity-dialog',
  templateUrl: './add-entity-modal.html',
  styleUrls: ['./add-entity-modal.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class AddEntityDialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  showDialog = false;

  // add library
  entityLocation; entityRoom; fromHours; toHours; resDays; termsAndConditions;

  // multiselect
  entityDays: number[];
  myOptions: IMultiSelectOption[];

  constructor() { }

  ngOnInit() {
    this.myOptions = [
      { id: 0, name: 'Sunday' },
      { id: 1, name: 'Monday' },
      { id: 2, name: 'Tuesday' },
      { id: 3, name: 'Wednesdays' },
      { id: 4, name: 'Thursdays' },
      { id: 5, name: 'Fridays' },
      { id: 6, name: 'Saturdays' },
    ];

  }

  private texts: IMultiSelectTexts = {
    defaultTitle: 'Select day'
  };

  private selectSettings: IMultiSelectSettings = {
    checkedStyle: 'glyphicon',
  };

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
