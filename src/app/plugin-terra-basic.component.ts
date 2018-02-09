import {
    Component,
    OnInit
} from '@angular/core';
const currentWeekNumber = require('current-week-number');
const moment = require('moment');

@Component({
    selector: 'plugin-terra-basic-app',
    template: require('./plugin-terra-basic.component.html'),
    styles:   [require('./plugin-terra-basic.component.scss')]
})
export class PluginTerraBasicComponent implements OnInit
{

    private _currentWeekDateRange:Array<string> = [];

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
        console.log(this._currentWeekDateRange);
    }

    private getDateRangeOfCurrentWeek(weekNumber):Array<string>
    {
        let dateRange = [];
        let monday = moment().week(weekNumber).startOf('week').add(1, 'days').format('DD.MM.YYYY');
        let tuesday = moment().week(weekNumber).startOf('week').add(2, 'days').format('DD.MM.YYYY');
        let wednesday = moment().week(weekNumber).startOf('week').add(3, 'days').format('DD.MM.YYYY');
        let thursday = moment().week(weekNumber).startOf('week').add(4, 'days').format('DD.MM.YYYY');
        let friday = moment().week(weekNumber).startOf('week').add(5, 'days').format('DD.MM.YYYY');

        dateRange.push({
            monday:    monday,
            tuesday:   tuesday,
            wednesday: wednesday,
            thursday:  thursday,
            friday:    friday
        });

        return dateRange;

    }

}
