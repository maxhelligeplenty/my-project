"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var plugin_terra_basic_component_1 = require("./plugin-terra-basic.component");
var start_component_1 = require("./start/start.component");
var terra_components_module_1 = require("@plentymarkets/terra-components/app/terra-components.module");
var http_1 = require("@angular/http");
var test_component_1 = require("./test/test.component");
var angular_l10n_1 = require("angular-l10n");
var forms_1 = require("@angular/forms");
var terra_localization_config_1 = require("./core/localization/terra-localization.config");
var PluginTerraBasicModule = (function () {
    function PluginTerraBasicModule() {
    }
    return PluginTerraBasicModule;
}());
PluginTerraBasicModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            angular_l10n_1.TranslationModule.forRoot(),
            terra_components_module_1.TerraComponentsModule.forRoot()
        ],
        declarations: [
            plugin_terra_basic_component_1.PluginTerraBasicComponent,
            start_component_1.StartComponent,
            test_component_1.TestComponent
        ],
        providers: [
            terra_localization_config_1.LocalizationConfig,
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: initLocalization,
                deps: [terra_localization_config_1.LocalizationConfig],
                multi: true
            }
        ],
        bootstrap: [
            plugin_terra_basic_component_1.PluginTerraBasicComponent
        ]
    })
], PluginTerraBasicModule);
exports.PluginTerraBasicModule = PluginTerraBasicModule;
function initLocalization(localizationConfig) {
    return function () { return localizationConfig.load(); };
}
exports.initLocalization = initLocalization;
//# sourceMappingURL=plugin-terra-basic.module.js.map