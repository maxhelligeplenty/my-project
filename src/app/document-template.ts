import {
    Component,
    OnInit
} from '@angular/core';
import {
    TerraAlertComponent,
    TerraPdfHelper
} from '@plentymarkets/terra-components';
import { isNullOrUndefined } from 'util';
import { DateRangeService } from './service/date-range.service';

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

    constructor(private _dataRangeService:DateRangeService)
    {
    }

    ngOnInit()
    {
        this._currentWeekDateRange = this._dataRangeService.getCurrentWeekDateRange();
        console.log(this._currentWeekDateRange);
    }

    private updateDateRange()
    {
        let newDate:Array<string> = [];
        newDate = this._dataRangeService.changeWeekDateRange(this._dateRange);
        if(!isNullOrUndefined(newDate))
        {
            this._currentWeekDateRange = [];
            this._currentWeekDateRange = newDate;
        }
        else
        {

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
        this._currentWeekDateRange = [];
        this._currentWeekDateRange = this._dataRangeService.getCurrentWeekDateRange();
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