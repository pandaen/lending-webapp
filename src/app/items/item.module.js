"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_list_component_1 = require("./item-list.component");
var item_detail_component_1 = require("./item-detail.component");
var item_filter_pipe_1 = require("./item-filter.pipe");
var item_guard_service_1 = require("./item-guard.service");
var item_service_1 = require("./item.service");
var user_service_1 = require("./../admin/adminShared/user.service.ts");
var admin_component_1 = require("./admin.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var AdminRoutes = [
    {
        path: 'items',
        component: admin_component_1.AdminComponent,
        children: [
            { path: '', component: item_list_component_1.ItemListComponent, canActivate: [user_service_1.UserService] },
        ]
    },
];
var ItemModule = (function () {
    function ItemModule() {
    }
    return ItemModule;
}());
ItemModule = __decorate([
    core_1.NgModule({
        declarations: [
            item_list_component_1.ItemListComponent,
            item_detail_component_1.ItemDetailComponent,
            item_filter_pipe_1.ItemFilterPipe,
            admin_component_1.AdminComponent
        ],
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
        ],
        providers: [
            item_service_1.ItemService,
            item_guard_service_1.ItemDetailGuard,
            user_service_1.UserService
        ]
    })
], ItemModule);
exports.ItemModule = ItemModule;
//# sourceMappingURL=item.module.js.map
