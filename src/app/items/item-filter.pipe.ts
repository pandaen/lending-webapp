import {Pipe, PipeTransform} from '@angular/core';
import {IItem} from './item';


@Pipe({
    name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {
    transform(value: IItem[], filterBy: string): IItem[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((item: IItem) =>
        item.name.toLocaleLowerCase().indexOf(filterBy) !== -1) :  value;
    }

}
