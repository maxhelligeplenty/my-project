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
    private _githubData:Array<string> = [];
    private _youtubeUrl;
    private _musicPlayer:any;
    private _commitMessages:any = [];


    constructor(private _dataRangeService:DateRangeService,
                private _templateService:CreateTemplateService,
                private _githubCommitService:GithubCommitService)
    {
    }

    ngOnInit()
    {
        this._musicPlayer = '<iframe style="display:none;" width="1381" height="618" src="https://www.youtube.com/embed/DzNPBqcJGk4?autoplay=1" frameborder="0"' +
                            'allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        //document.getElementsByClassName('musicPlayer')[0].innerHTML = this._musicPlayer;
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

    private saveData()
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
    }

    private addData()
    {
        this.saveData();
        let toReplace:string = this._templateData[5];
        let count = (toReplace.match(/<p>/g) || []).length;

        if(count > 1)
        {
            for(let i = 0; i < count; i++)
            {
                toReplace = toReplace.replace('<p>', '<span>');
                if(i < count - 1)
                {
                    toReplace = toReplace.replace('</p>', '</span><br/>');
                }
                else
                {
                    toReplace = toReplace.replace('</p>', '</span>');
                }
            }

        }

        this._templateData[5] = toReplace;

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
        this._textForeachDay = [];
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

    private addNewMusic()
    {
        if(!isNullOrUndefined(this._youtubeUrl))
        {
            let streamURL = this._youtubeUrl.replace('watch?v=', 'embed/');
            this._youtubeUrl = '';
            this._musicPlayer = '<iframe style="display:none;" width="1381" height="618" src="' + streamURL + '?autoplay=1" frameborder="0"' +
                                'allow="autoplay; encrypted-media" allowfullscreen></iframe>';
            document.getElementsByClassName('musicPlayer')[0].innerHTML = this._musicPlayer;
            this._currentWeekDateRange = this._dataRangeService.getCurrentWeekDateRange();
        }
        else
        {
            this._errorAlert.addAlert({
                msg:              'You have to add a URL first',
                type:             'danger',
                dismissOnTimeout: 10000,
                identifier:       'add a URL'
            });
        }
    }

    private printCurrentTemplate()
    {
        if(!isNullOrUndefined(document.getElementsByClassName('toHtml')[0].innerHTML))
        {
            let printContents = document.getElementsByClassName('toHtml')[0].innerHTML;
            let appBody = document.getElementsByClassName('appBody')[0].innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = appBody;
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

    private getAllCommitMessages(userName:string, branchName:string)
    {
        if(!isNullOrUndefined(userName) && !isNullOrUndefined(branchName))
        {
            this._githubCommitService.getAllUserBranches(branchName, userName).subscribe((res:any) =>
            {
                let entries:Array<string> = res.json();
                entries.forEach((data) =>
                {
                    console.log(data['commit']['message']);
                    console.log(data['commit']['committer']['date'].substring(0, data['commit']['committer']['date'].length - 10));
                });
            });
        }
    }

}