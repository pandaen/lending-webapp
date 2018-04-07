import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IEntity} from '../entity';

@Component({
  selector: 'app-entity-list-nest',
  templateUrl: './entity-list-nest.component.html',
  styleUrls: ['./entity-list-nest.component.css']
})
export class EntityListNestComponent implements OnInit, OnChanges  {
  @Input() entities: IEntity[];
  @Input() selectedLibrary: string;
 @Input() joinedlib: IEntity[];
  @Input() userEntityName: any;  // used for set currentEntity text
  @Input() listFilter: string;
  visibleEntities: IEntity[] = [];
  visibleJoinedLibrary: IEntity[] = [];
  allVisible: IEntity[] = [];
  thisMapNameid;
@Output() grantedLibClicked: EventEmitter<string> = new EventEmitter();


  // dialog
  currentRow: Number;
  selctedIDQuery;
  // toggle itemDialog switch
  showDialog: boolean;
  grantedTest;
  constructor() {
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
        return joinedlib.adminAccess; // joinedlib.adminAccess === 'true' HAVE TO BE DEBUGGED!!!
    });
  }


  setClickedRow(index, selectedLibrary) {
    this.currentRow = index;
    this.selectedLibrary = selectedLibrary;
    this.showDialog = !this.showDialog;
  }


  setClickedGrantedLibRow(index, selectedLibrary) {
    this.currentRow = index;
   this.thisMapNameid = selectedLibrary.$key;
 this.grantedLibClicked.emit(selectedLibrary.entity);
    this.showDialog = !this.showDialog;
  }

} // class
