"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_service_1 = require("./item.service");
var ItemDetailComponent = (function () {
    function ItemDetailComponent(_route, _router, _itemService) {
        this._route = _route;
        this._router = _router;
        this._itemService = _itemService;
        this.pageTitle = 'Item Detail';
    }
    // Sets items
    ItemDetailComponent.prototype.ngOnInit = function () {
        /*
        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;
        */
        this.sub = this._route.params.subscribe(function (params) {
            // let id = +params['id'];
            //  this.get(id);
        });
    };
    ItemDetailComponent.prototype.onBack = function () {
        this._router.navigate(['/items']);
    };
    return ItemDetailComponent;
}()); // class
ItemDetailComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/items/item-detail.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, item_service_1.ItemService])
], ItemDetailComponent);
exports.ItemDetailComponent = ItemDetailComponent;
//# sourceMappingURL=item-detail.component.js.map