import {
    Component,
    OnInit
} from '@angular/core';
import {
    TerraAlertComponent,
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
    private _errorAlert:TerraAlertComponent = TerraAlertComponent.getInstance();

    private _currentWeekDateRange:Array<string> = [];
    private _customerData:Array<string> = [];
    private _textForeachDay:Array<string> = [];
    private _dateRange:Array<string> = [];
    private _templateData:Array<any> = [];

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

    private addData()
    {
        if(!isNullOrUndefined(this._customerData['firstname']) && !isNullOrUndefined(this._customerData['lastname']) &&
           !isNullOrUndefined(this._customerData['number']))
        {
            let newDocument = document.getElementsByClassName("toHtml")[0].innerHTML.toString();
            let documentStream = btoa(newDocument);
            let fileURL:string = URL.createObjectURL(TerraPdfHelper.createPdfBlob(documentStream));
            this._templateData.push(
                {
                    fileStream: fileURL,
                    fileName:   this._customerData['firstname'] + '-'
                                + this._customerData['lastname'] + '-' + this._customerData['number'] + '.odt'
                });
        }
        else
        {
            this._errorAlert.addAlert({
                msg:              'You have to fill in at least Firstname, Lastname and Number of File',
                type:             'danger',
                dismissOnTimeout: 10000,
                identifier:       'add some Data to create a Filestream'
            });
        }
    }

    private clearData()
    {
        this._customerData = [];
        this._textForeachDay = [];
        this.getWeekDates();
    }

    private exportAsDoc()
    {
        if(this._templateData.length > 0)
        {
            let link:any = document.createElement('a');
            this._templateData.forEach(function(fileData)
            {
                link.href = fileData['fileStream'];
                link.download = fileData['fileName'];
                link.click();
            });
            this._templateData = [];
        }
        else
        {
            this._errorAlert.addAlert({
                msg:              'You have to Add Data first to generate your Template',
                type:             'danger',
                dismissOnTimeout: 10000,
                identifier:       'add some Data to export a File'
            });
        }
    }

    private addDefaultValues(type):void
    {
        switch(type)
        {
            case 'vac':
                this._textForeachDay = [];
                this.setTextValues('Urlaub');
                break;
            case 'sick':
                this._textForeachDay = [];
                this.setTextValues('Krank');
                break;
            default:
                break;
        }
    }

    private setTextValues(value):void
    {
        this._textForeachDay['monday'] = value;
        this._textForeachDay['tuesday'] = value;
        this._textForeachDay['wednesday'] = value;
        this._textForeachDay['thursday'] = value;
        this._textForeachDay['friday'] = value;
    }

}




















































