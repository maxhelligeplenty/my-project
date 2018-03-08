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
import { CreateTemplateService } from './service/create-template.service';
import { GithubCommitService } from './service/github-commit.service';

@Component({
    selector: 'document-template',
    template: require('./document-template.html'),
    styles:   [require('./document-template.scss')]
})
export class DocumentTemplate implements OnInit
{
    private _errorAlert:TerraAlertComponent = TerraAlertComponent.getInstance();

    private _currentWeekDateRange:Array<string> = [];
    private _dateRange:Array<string> = [];
    private _customerData:Array<string> = [];
    private _textForeachDay:Array<any> = [];
    private _templateData:Array<any> = [];
    private _fileUrls:Array<any> = [];
    private _workTimePerDay:Array<number> = []
    private _githubData:Array<string> = [];

    constructor(private _dataRangeService:DateRangeService,
                private _templateService:CreateTemplateService,
                private _githubCommitService:GithubCommitService)
    {
    }

    ngOnInit()
    {
        this._textForeachDay[0] = '';
        this._textForeachDay[1] = '';
        this._textForeachDay[2] = '';
        this._textForeachDay[3] = '';
        this._textForeachDay[4] = '';
        this._workTimePerDay[0] = 8;
        this._workTimePerDay[1] = 8;
        this._workTimePerDay[2] = 8;
        this._workTimePerDay[3] = 8;
        this._workTimePerDay[4] = 8;
        this._currentWeekDateRange = this._dataRangeService.getCurrentWeekDateRange();
    }

    private updateDateRange()
    {
        let newDate:Array<string> = [];
        newDate = this._dataRangeService.changeWeekDateRange(this._dateRange);
        if(!isNullOrUndefined(newDate))
        {
            this._currentWeekDateRange = [];
            this._currentWeekDateRange = newDate;
            this._errorAlert.addAlert({
                msg:              'Your current Date Range has been changed.',
                type:             'success',
                dismissOnTimeout: 5000,
                identifier:       'Date Successfully changed'
            });
        }
        else
        {

        }
    }

    private saveTemplateData()
    {
        this._templateData[0] = this._customerData[0];
        this._templateData[1] = this._customerData[1];
        this._templateData[2] = this._customerData[2];
        this._templateData[3] = this._customerData[3];
        this._templateData[4] = this._customerData[4];
        this._templateData[5] = this._textForeachDay[0];
        this._templateData[6] = this._textForeachDay[1];
        this._templateData[7] = this._textForeachDay[2];
        this._templateData[8] = this._textForeachDay[3];
        this._templateData[9] = this._textForeachDay[4];
        this._templateData[10] = this._currentWeekDateRange[0];
        this._templateData[11] = this._currentWeekDateRange[1];
        this._templateData[12] = this._currentWeekDateRange[2];
        this._templateData[13] = this._currentWeekDateRange[3];
        this._templateData[14] = this._currentWeekDateRange[4];
        this._templateData[15] = this._workTimePerDay[0];
        this._templateData[16] = this._workTimePerDay[1];
        this._templateData[17] = this._workTimePerDay[2];
        this._templateData[18] = this._workTimePerDay[3];
        this._templateData[19] = this._workTimePerDay[4];
        this._templateData[20] = this._workTimePerDay[0] + this._workTimePerDay[1] +
                                 this._workTimePerDay[2] + this._workTimePerDay[3] + this._workTimePerDay[4];
    }

    private addData()
    {
        this.saveTemplateData();
        this.convertText();

        if(!isNullOrUndefined(this._templateData[0]) && !isNullOrUndefined(this._templateData[1]) &&
           !isNullOrUndefined(this._templateData[3]))
        {
            let generatedTemplate = this._templateService.getTemplate(this._templateData);
            document.getElementsByClassName('toHtml')[0].innerHTML = generatedTemplate;
            let rawDocument = document.getElementsByClassName('toHtml')[0].innerHTML;
            console.log(rawDocument);
            let documentStream = btoa(rawDocument);
            let fileURL:string = URL.createObjectURL(TerraPdfHelper.createPdfBlob(documentStream));
            this._fileUrls.push(
                {
                    fileStream: fileURL,
                    fileName:   this._templateData[0] + '-'
                                + this._templateData[1] + '-' + this._templateData[3] + '.odt'
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
        this._textForeachDay[0] = '';
        this._textForeachDay[1] = '';
        this._textForeachDay[2] = '';
        this._textForeachDay[3] = '';
        this._textForeachDay[4] = '';
        this._currentWeekDateRange = [];
        this._currentWeekDateRange = this._dataRangeService.getCurrentWeekDateRange();
    }

    private exportAsDoc()
    {
        if(this._fileUrls.length > 0)
        {
            let link:any = document.createElement('a');
            this._fileUrls.forEach(function(fileData)
            {
                link.href = fileData['fileStream'];
                link.download = fileData['fileName'];
                link.click();
            });
            this._fileUrls = [];
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
        this._textForeachDay[0] = value;
        this._textForeachDay[1] = value;
        this._textForeachDay[2] = value;
        this._textForeachDay[3] = value;
        this._textForeachDay[4] = value;
    }

    private printCurrentTemplate()
    {
        if(!isNullOrUndefined(document.getElementsByClassName('toHtml')[0].innerHTML))
        {
            let printWindow = window.open('', 'PRINT', 'height=350,width=750');
            printWindow.document.write('<html><head><title>' + document.title + '</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write(document.getElementsByClassName('toHtml')[0].innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
        else
        {
            this._errorAlert.addAlert({
                msg:              'There is no Template to download yet.',
                type:             'danger',
                dismissOnTimeout: 10000,
                identifier:       'add Data first.'
            });
        }
    }

    private convertText()
    {
        let toReplace:string;
        for(let i = 5; i < 10; i++)
        {
            toReplace = this._templateData[i];
            let count = (toReplace.match(/<p>/g) || []).length;
            if(count > 0)
            {
                for(let j = 0; j < count; j++)
                {
                    toReplace = toReplace.replace('<p>', '<span>');
                    if(j < count - 1)
                    {
                        toReplace = toReplace.replace('</p>', '</span><br/>');
                    }
                    else
                    {
                        toReplace = toReplace.replace('</p>', '</span>');
                    }
                }
            }
            this._templateData[i] = toReplace;
        }
    }

    private getAllCommitMessages(userName:string, repo:string, branchName:string, author:string)
    {
        if(!isNullOrUndefined(userName) && !isNullOrUndefined(branchName))
        {
            this._githubCommitService.getAllUserBranches(userName, repo, branchName).subscribe((res:any) =>
            {
                let entries:Array<string> = res.json();
                entries.forEach((data) =>
                {
                    if(data['author']['login'] == author)
                    {
                        let checkDate = data['commit']['committer']['date'].substring(0,
                            data['commit']['committer']['date'].length - 10);
                        checkDate = checkDate.substring(8, 10) + '.' + checkDate.substring(5, 7) + '.' + checkDate.substring(0, 4);
                        switch(checkDate)
                        {
                            case this._currentWeekDateRange[0]:
                                this._textForeachDay[0] += data['commit']['message'] + '<br/>';
                                break;
                            case this._currentWeekDateRange[1]:
                                this._textForeachDay[1] += data['commit']['message'] + '<br/>';
                                break;
                            case this._currentWeekDateRange[2]:
                                this._textForeachDay[2] += data['commit']['message'] + '<br/>';
                                break;
                            case this._currentWeekDateRange[3]:
                                this._textForeachDay[3] += data['commit']['message'] + '<br/>';
                                break;
                            case this._currentWeekDateRange[4]:
                                this._textForeachDay[4] += data['commit']['message'] + '<br/>';
                                break;
                            default:
                                break;
                        }
                    }
                });
            });
        }
    }
}