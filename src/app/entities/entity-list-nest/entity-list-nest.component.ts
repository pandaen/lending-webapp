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
 @Input() joinedlib: IEntity[];
  @Input() userEntityName: any;  // used for set currentEntity text
  @Input() listFilter: string;
  visibleEntities: IEntity[] = [];
  visibleJoinedLibrary: IEntity[] = [];
  allVisible: IEntity[] = [];

  // dialog
  currentRow: Number;
  selectedLibrary;
  // toggle itemDialog switch
  showDialog: boolean;
  grantedTest;
  constructor(private _uService: UserService) {
  } // constructor

  ngOnInit() {

  } // ngOnInit

// called when
  ngOnChanges () {
 //  this.visibleJoinedEntities = this.joinedEntities.slice(0);
    if(this.entities || this.joinedlib) {
      this.visibleEntities = this.entities.slice(0);
      this.filterGrantedLibrarys();
    }
  }

  filterGrantedLibrarys() {
    this.visibleJoinedLibrary = this.joinedlib.slice(0);
    this.visibleJoinedLibrary = this.joinedlib.filter(joinedlib => {
        return joinedlib.adminAccess; // joinedlib.adminAccess === 'true' HAVE TO BEE DEBUGGED!!!
    });
  }


  setClickedRow(index, selectedLibrary) {
    this.currentRow = index;
    this.selectedLibrary = selectedLibrary;
    this.showDialog = !this.showDialog;
  }

} // class
