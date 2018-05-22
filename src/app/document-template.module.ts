import {
    APP_INITIALIZER,
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentTemplate } from './document-template';
import { HttpModule } from '@angular/http';
import {
    L10nLoader,
    TranslationModule
} from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { l10nConfig } from './core/localization/l10n.config';
import { HttpClientModule } from '@angular/common/http';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app';
import { RouterModule } from '@angular/router';
import { GithubCommitService } from './service/github-commit.service';
import { CreateTemplateService } from './service/create-template.service';
import { DateRangeService } from './service/date-range.service';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        HttpClientModule,
        TranslationModule.forRoot(l10nConfig),
        RouterModule.forRoot([]),
        TerraComponentsModule.forRoot()
    ],
    declarations: [
        DocumentTemplate
    ],
    providers:    [
        {
            provide:    APP_INITIALIZER,
            useFactory: initL10n,
            deps:       [L10nLoader],
            multi:      true
        },
        DateRangeService,
        CreateTemplateService,
        GithubCommitService,
    ],
    bootstrap:    [
        DocumentTemplate
    ]
})
export class PluginTerraBasicModule
{
    constructor(public l10nLoader:L10nLoader)
    {
        this.l10nLoader.load();
    }
}

function initL10n(l10nLoader:L10nLoader):Function
{
    return ():Promise<void> => l10nLoader.load();
}
