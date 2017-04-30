"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemService = (function () {
    function ItemService() {
    }
    ItemService.prototype.getItems = function () {
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
    };
    return ItemService;
}()); // class
ItemService = __decorate([
    core_1.Injectable()
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map