import { Injectable } from '@angular/core';
import * as currentWeekNumber from 'current-week-number';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { TerraAlertComponent } from '@plentymarkets/terra-components';

@Injectable()
export class DateRangeService
{

    private _errorAlert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor()
    {
    }

    public getCurrentWeekDateRange():Array<string>
    {
        let currentDate = new Date();
        let currentWeek = currentWeekNumber(currentDate);
        let dateRange = [];

        dateRange['monday'] = moment().week(currentWeek).startOf('week').add(1, 'days').format('DD.MM.YYYY');
        dateRange['tuesday'] = moment().week(currentWeek).startOf('week').add(2, 'days').format('DD.MM.YYYY');
        dateRange['wednesday'] = moment().week(currentWeek).startOf('week').add(3, 'days').format('DD.MM.YYYY');
        dateRange['thursday'] = moment().week(currentWeek).startOf('week').add(4, 'days').format('DD.MM.YYYY');
        dateRange['friday'] = moment().week(currentWeek).startOf('week').add(5, 'days').format('DD.MM.YYYY');

        return dateRange;
    }

    public changeWeekDateRange(dateRange):Array<string>
    {
        if(!isNullOrUndefined(dateRange[0]) && dateRange[0] !== ''
           && !isNullOrUndefined(dateRange[1]) && dateRange[1] !== '')
        {
            let checkMonday:number = new Date(moment(dateRange[0]).format('YYYY-MM-DD')).getDay();
            let checkFriday:number = new Date(moment(dateRange[1]).format('YYYY-MM-DD')).getDay();

            if(checkMonday === 1 && checkFriday === 5)
            {
                let checkRangeBetweenDays:boolean = (moment(dateRange[0]).add(4, 'days').format('DD.MM.YYYY')
                                                     === moment(dateRange[1]).format('DD.MM.YYYY'));
                if(checkRangeBetweenDays)
                {
                    let newDateRange = [];

                    newDateRange['monday'] = moment(dateRange[0]).format('DD.MM.YYYY');
                    newDateRange['tuesday'] = moment(dateRange[0]).add(1, 'days').format('DD.MM.YYYY');
                    newDateRange['wednesday'] = moment(dateRange[0]).add(2, 'days').format('DD.MM.YYYY');
                    newDateRange['thursday'] = moment(dateRange[0]).add(3, 'days').format('DD.MM.YYYY');
                    newDateRange['friday'] = moment(dateRange[1]).format('DD.MM.YYYY');

                    return newDateRange;
                }
                else
                {
                    this._errorAlert.addAlert({
                        msg:              'You cant pick a Date between monday and friday with a date range above 5 days',
                        type:             'danger',
                        dismissOnTimeout: 10000,
                        identifier:       'range-between-days'
                    });
                }
            }
            else
            {
                this._errorAlert.addAlert({
                    msg:              'You have to chose a monday for the start of the week and a friday for the end of the week',
                    type:             'danger',
                    dismissOnTimeout: 10000,
                    identifier:       'wrong-start-or-end'
                });
            }
        }
        else
        {
            this._errorAlert.addAlert({
                msg:              'You have to pick a start date and a end date',
                type:             'danger',
                dismissOnTimeout: 10000,
                identifier:       'start-and-end'
            });
        }
    }

}
