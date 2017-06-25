import {Pipe, PipeTransform} from '@angular/core';
import {IEntity} from './entity';


@Pipe({
  name: 'entityFilter'
})
export class EntityFilterPipe implements PipeTransform {
  transform(value: IEntity[], filterBy: string): IEntity[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((entity: IEntity) =>
    entity.name.toLocaleLowerCase().indexOf(filterBy) !== -1) :  value;
  }
}
