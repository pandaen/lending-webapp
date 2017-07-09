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
  @Input() joinedEntities: IEntity[];
  @Input() userEntityName: any;
  @Input() listFilter: string;
  visibleEntities: IEntity[] = [];
  visibleJoinedEntities: IEntity[] = [];
  allVisible: IEntity[] = [];
  currentRow: Number;

  constructor(private _uService: UserService) {


  } // constructor

  ngOnInit() {
  console.log('visibleJoinedEntities is: ' + this.visibleJoinedEntities.length);

  } // ngOnInit


  ngOnChanges () {
   this.visibleJoinedEntities = this.joinedEntities.slice(0);
    if(this.entities) {
      this.visibleEntities = this.entities.slice(0);
      console.log('visibleEntities.length is: ' + this.visibleEntities.length);
    }
  }


  setClickedRow(index, id: string,name) {
    this.currentRow = index;
    //  this._router.navigate(['/user/' + id]);
    this._uService.setEntity(id,name);
    console.log('clicked row with id ' +id +' : name is: ' + name);
  }

} // class
