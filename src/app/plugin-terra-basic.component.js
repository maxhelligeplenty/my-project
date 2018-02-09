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
var currentWeekNumber = require('current-week-number');
var moment = require('moment');
var PluginTerraBasicComponent = (function () {
    function PluginTerraBasicComponent() {
        this._currentWeekDateRange = [];
    }
    PluginTerraBasicComponent.prototype.ngOnInit = function () {
        this.getWeekDates();
    };
    PluginTerraBasicComponent.prototype.getWeekDates = function () {
        var currentDate = new Date();
        var currentWeek = currentWeekNumber(currentDate);
        this._currentWeekDateRange = this.getDateRangeOfCurrentWeek(currentWeek);
        console.log(this._currentWeekDateRange);
    };
    PluginTerraBasicComponent.prototype.getDateRangeOfCurrentWeek = function (weekNumber) {
        var dateRange = [];
        var monday = moment().week(weekNumber).startOf('week').add(1, 'days').format('DD.MM.YYYY');
        var tuesday = moment().week(weekNumber).startOf('week').add(2, 'days').format('DD.MM.YYYY');
        var wednesday = moment().week(weekNumber).startOf('week').add(3, 'days').format('DD.MM.YYYY');
        var thursday = moment().week(weekNumber).startOf('week').add(4, 'days').format('DD.MM.YYYY');
        var friday = moment().week(weekNumber).startOf('week').add(5, 'days').format('DD.MM.YYYY');
        dateRange.push({
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday
        });
        return dateRange;
    };
    return PluginTerraBasicComponent;
}());
PluginTerraBasicComponent = __decorate([
    core_1.Component({
        selector: 'plugin-terra-basic-app',
        template: require('./plugin-terra-basic.component.html'),
        styles: [require('./plugin-terra-basic.component.scss')]
    }),
    __metadata("design:paramtypes", [])
], PluginTerraBasicComponent);
exports.PluginTerraBasicComponent = PluginTerraBasicComponent;
//# sourceMappingURL=plugin-terra-basic.component.js.map