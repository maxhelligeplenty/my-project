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
var angular_l10n_1 = require("angular-l10n");
var LocalizationConfig = (function () {
    function LocalizationConfig(locale, translation) {
        this.locale = locale;
        this.translation = translation;
    }
    LocalizationConfig.prototype.load = function () {
        var _this = this;
        //Definitions for i18n
        if (process.env.ENV === 'production') {
            var deploymentTerraHash = window.deploymentTerraHash;
            this.translation
                .addConfiguration()
                .addProvider('assets/lang/locale_')
                .addProvider('assets/lang/terra-components/locale-');
        }
        else {
            this.translation.addConfiguration()
                .addProvider('src/app/assets/lang/locale_')
                .addProvider('node_modules/@plentymarkets/terra-components/app/assets/lang/locale-');
        }
        this.locale.addConfiguration()
            .addLanguages(['de',
            'en'])
            .setCookieExpiration(30)
            .defineDefaultLocale('en', 'EN');
        var langInLocalStorage = localStorage.getItem('plentymarkets_lang_');
        if (langInLocalStorage !== null) {
            this.locale.setCurrentLanguage(langInLocalStorage);
        }
        else {
            var lang = navigator.language.slice(0, 2).toLocaleLowerCase();
            if (lang !== 'de' && lang !== 'en') {
                lang = 'en';
            }
            this.locale.setCurrentLanguage(lang);
            localStorage.setItem('plentymarkets_lang_', lang);
        }
        var promise = new Promise(function (resolve) {
            _this.translation.translationChanged.subscribe(function () {
                resolve(true);
            });
        });
        this.locale.init();
        this.translation.init();
        return promise;
    };
    return LocalizationConfig;
}());
LocalizationConfig = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular_l10n_1.LocaleService, angular_l10n_1.TranslationService])
], LocalizationConfig);
exports.LocalizationConfig = LocalizationConfig;
//# sourceMappingURL=terra-localization.config.js.map