import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    TerraAlertComponent,
    TerraOverlayComponent,
    TerraPdfHelper
} from '@plentymarkets/terra-components';
import { isNullOrUndefined } from 'util';
import * as currentWeekNumber from 'current-week-number';
import * as moment from 'moment';

@Component({
    selector: 'document-template',
    template: require('./document-template.html'),
    styles:   [require('./document-template.scss')]
})
export class DocumentTemplate implements OnInit
{
    @ViewChild('DataOverlay') public viewDataOverlay:TerraOverlayComponent;
    private _errorAlert:TerraAlertComponent = TerraAlertComponent.getInstance();

    private _currentWeekDateRange:Array<string> = [];
    private _customerData:Array<string> = [];
    private _textForeachDay:Array<string> = [];
    private _dateRange:Array<string> = [];

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

    private changeWeekDate()
    {

        if(!isNullOrUndefined(this._dateRange[0]) && this._dateRange[0] !== ''
           && !isNullOrUndefined(this._dateRange[1]) && this._dateRange[1] !== '')
        {
            let checkMonday:number = new Date(moment(this._dateRange[0]).format('YYYY-MM-DD')).getDay();
            let checkFriday:number = new Date(moment(this._dateRange[1]).format('YYYY-MM-DD')).getDay();

            if(checkMonday === 1 && checkFriday === 5)
            {
                let checkRangeBetweenDays:boolean = (moment(this._dateRange[0]).add(4, 'days').format('DD.MM.YYYY')
                                                     === moment(this._dateRange[1]).format('DD.MM.YYYY'));
                if(checkRangeBetweenDays)
                {
                    this._currentWeekDateRange[0]['monday'] = moment(this._dateRange[0]).format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['tuesday'] = moment(this._dateRange[0]).add(1, 'days').format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['wednesday'] = moment(this._dateRange[0]).add(2, 'days').format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['thursday'] = moment(this._dateRange[0]).add(3, 'days').format('DD.MM.YYYY');
                    this._currentWeekDateRange[0]['friday'] = moment(this._dateRange[1]).format('DD.MM.YYYY');
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

    private openDataOverlay():void
    {
        this.viewDataOverlay.showOverlay();
    }

    private clearData()
    {
        this._customerData = [];
        this._textForeachDay = [];
        this.getWeekDates();
    }

    private saveAsDoc()
    {
        if(!isNullOrUndefined(this._customerData[0]) && !isNullOrUndefined(this._customerData[1]) &&
           !isNullOrUndefined(this._customerData[3]))
        {
            let newDocument = document.getElementsByClassName("toHtml")[0].innerHTML.toString();
            let documentStream = btoa(newDocument);
            let fileURL:string = URL.createObjectURL(TerraPdfHelper.createPdfBlob(documentStream));
            console.log(documentStream);
            let link:any = document.createElement('a');
            link.href = fileURL;
            link.download = this._customerData[0] + '-' + this._customerData[1] + '-' + this._customerData[3] + '.odt';
            link.click();
        }
        else
        {
            this._errorAlert.addAlert({
                msg:              'You have to fill in at least Firstname, Lastname and Number of File',
                type:             'danger',
                dismissOnTimeout: 10000,
                identifier:       'add some Data to create a File'
            });
        }
    }

}




















































