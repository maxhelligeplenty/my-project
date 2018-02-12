import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraOverlayComponent } from '@plentymarkets/terra-components';
const currentWeekNumber = require('current-week-number');
const moment = require('moment');

@Component({
    selector: 'plugin-terra-basic-app',
    template: require('./plugin-terra-basic.component.html'),
    styles:   [require('./plugin-terra-basic.component.scss')]
})
export class PluginTerraBasicComponent implements OnInit
{
    @ViewChild('DataOverlay') public viewDataOverlay:TerraOverlayComponent;

    private _currentWeekDateRange:Array<string> = [];
    private _customerData:Array<string> = [];
    private _textForeachDay:Array<string> = [];

    constructor()
    {
    }

    ngOnInit()
    {
        this.getWeekDates();
    }

    private getWeekDates()
    {
        let currentDate = new Date();
        let currentWeek = currentWeekNumber(currentDate);
        this._currentWeekDateRange = this.getDateRangeOfCurrentWeek(currentWeek);
    }

    private getDateRangeOfCurrentWeek(weekNumber):Array<string>
    {
        let dateRange = [];

        dateRange.push({
            monday:    moment().week(weekNumber).startOf('week').add(1, 'days').format('DD.MM.YYYY'),
            tuesday:   moment().week(weekNumber).startOf('week').add(2, 'days').format('DD.MM.YYYY'),
            wednesday: moment().week(weekNumber).startOf('week').add(3, 'days').format('DD.MM.YYYY'),
            thursday:  moment().week(weekNumber).startOf('week').add(4, 'days').format('DD.MM.YYYY'),
            friday:    moment().week(weekNumber).startOf('week').add(5, 'days').format('DD.MM.YYYY')
        });

        return dateRange;

    }

    private openDataOverlay():void
    {
        this.viewDataOverlay.showOverlay();
    }

}
