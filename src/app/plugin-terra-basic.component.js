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
var terra_components_1 = require("@plentymarkets/terra-components");
var util_1 = require("util");
var currentWeekNumber = require('current-week-number');
var moment = require('moment');
var PluginTerraBasicComponent = (function () {
    function PluginTerraBasicComponent() {
        this._errorAlert = terra_components_1.TerraAlertComponent.getInstance();
        this._currentWeekDateRange = [];
        this._customerData = [];
        this._textForeachDay = [];
        this._dateRange = [];
    }
    PluginTerraBasicComponent.prototype.ngOnInit = function () {
        this.getWeekDates();
    };
    PluginTerraBasicComponent.prototype.getWeekDates = function () {
        var currentDate = new Date();
        var currentWeek = currentWeekNumber(currentDate);
        this._currentWeekDateRange = this.getDateRangeOfCurrentWeek(currentWeek);
    };
    PluginTerraBasicComponent.prototype.getDateRangeOfCurrentWeek = function (weekNumber) {
        var dateRange = [];
        dateRange.push({
            monday: moment().week(weekNumber).startOf('week').add(1, 'days').format('DD.MM.YYYY'),
            tuesday: moment().week(weekNumber).startOf('week').add(2, 'days').format('DD.MM.YYYY'),
            wednesday: moment().week(weekNumber).startOf('week').add(3, 'days').format('DD.MM.YYYY'),
            thursday: moment().week(weekNumber).startOf('week').add(4, 'days').format('DD.MM.YYYY'),
            friday: moment().week(weekNumber).startOf('week').add(5, 'days').format('DD.MM.YYYY')
        });
        return dateRange;
    };
    PluginTerraBasicComponent.prototype.changeWeekDate = function () {
        if (!util_1.isNullOrUndefined(this._dateRange[0]) && this._dateRange[0] !== ''
            && !util_1.isNullOrUndefined(this._dateRange[1]) && this._dateRange[1] !== '') {
            var checkMonday = new Date(moment(this._dateRange[0]).format('YYYY-MM-DD')).getDay();
            var checkFriday = new Date(moment(this._dateRange[1]).format('YYYY-MM-DD')).getDay();
            if (checkMonday === 1 && checkFriday === 5) {
                var checkRangeBetweenDays = (moment(this._dateRange[0]).add(4, 'days').format('DD.MM.YYYY')
                    === moment(this._dateRange[1]).format('DD.MM.YYYY'));
                if (checkRangeBetweenDays) {
                    this._currentWeekDateRange[0]['monday'] = moment(this._dateRange[0]).format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['tuesday'] = moment(this._dateRange[0]).add(1, 'days').format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['wednesday'] = moment(this._dateRange[0]).add(2, 'days').format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['thursday'] = moment(this._dateRange[0]).add(3, 'days').format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['friday'] = moment(this._dateRange[1]).format('DD.MM.YYYY');
                }
                else {
                    this._errorAlert.addAlert({
                        msg: 'You cant pick a Date between monday and friday with a date range above 5 days',
                        type: 'danger',
                        dismissOnTimeout: 10000,
                        identifier: 'range-between-days'
                    });
                }
            }
            else {
                this._errorAlert.addAlert({
                    msg: 'You have to chose a monday for the start of the week and a friday for the end of the week',
                    type: 'danger',
                    dismissOnTimeout: 10000,
                    identifier: 'wrong-start-or-end'
                });
            }
        }
        else {
            this._errorAlert.addAlert({
                msg: 'You have to pick a start date and a end date',
                type: 'danger',
                dismissOnTimeout: 10000,
                identifier: 'start-and-end'
            });
        }
    };
    PluginTerraBasicComponent.prototype.openDataOverlay = function () {
        this.viewDataOverlay.showOverlay();
    };
    PluginTerraBasicComponent.prototype.clearData = function () {
        this._customerData = [];
        this._textForeachDay = [];
        this._newDocument = '';
        this.getWeekDates();
    };
    return PluginTerraBasicComponent;
}());
__decorate([
    core_1.ViewChild('DataOverlay'),
    __metadata("design:type", typeof (_a = typeof terra_components_1.TerraOverlayComponent !== "undefined" && terra_components_1.TerraOverlayComponent) === "function" && _a || Object)
], PluginTerraBasicComponent.prototype, "viewDataOverlay", void 0);
PluginTerraBasicComponent = __decorate([
    core_1.Component({
        selector: 'plugin-terra-basic-app',
        template: require('./plugin-terra-basic.component.html'),
        styles: [require('./plugin-terra-basic.component.scss')]
    }),
    __metadata("design:paramtypes", [])
], PluginTerraBasicComponent);
exports.PluginTerraBasicComponent = PluginTerraBasicComponent;
var _a;
//# sourceMappingURL=plugin-terra-basic.component.js.map