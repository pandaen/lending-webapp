import { Injectable } from '@angular/core';
import {IItem} from './item';


@Injectable()
export class ItemService {

    getItems(): IItem[] {
        return [
            {
                'itemId': 2,
                'itemName': 'Hammer',
                'borrowerName': 'Fredrik S',
                'dueDate': '14.12.2016',
                'status': 'Out',
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
            },
            {
                'itemId': 5,
                'itemName': 'Xbox Controller',
                'borrowerName': 'John Smith',
                'dueDate': '22.03.2017',
                'status': 'Notify',
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
            }
        ];

    }



} // class
