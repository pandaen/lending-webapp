import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IEntity} from '../entity';
import {UserService} from '../../admin/adminShared/user.service';

@Component({
  selector: 'app-entity-list-nest',
  templateUrl: './entity-list-nest.component.html',
  styleUrls: ['./entity-list-nest.component.css']
})
export class EntityListNestComponent implements OnInit, OnChanges  {
  @Input() entities: IEntity[];
 // @Input() joinedEntities: IEntity[];
  @Input() userEntityName: any;
  @Input() listFilter: string;
  visibleEntities: IEntity[] = [];
  visibleJoinedEntities: IEntity[] = [];
  allVisible: IEntity[] = [];

  // dialog
  currentRow: Number;
  sendID;
  sendName;
  // toggle itemDialog switch
  showDialog: boolean;

  constructor(private _uService: UserService) {


  } // constructor

  ngOnInit() {

  } // ngOnInit

// called when
  ngOnChanges () {
 //  this.visibleJoinedEntities = this.joinedEntities.slice(0);
    if(this.entities) {
      this.visibleEntities = this.entities.slice(0);
    }
  }


  setClickedRow(index, id: string,name) {
    this.currentRow = index;
    this.sendID = id;
    this.sendName = name;
    this.showDialog = !this.showDialog;
  }

} // class
