import { Injectable } from '@angular/core';

@Injectable()
export class CreateTemplateService
{

    public getTemplate(templateData)
    {

        let rawTemplate = `<div class="doc-template-wrapper">
                              <div class="doc-template">
                               <div class="header-wrapper" align="CENTER">
                                <div>
                                 <table align="CENTER" border="0" style="border-color: white;">
                                  <tbody>
                                   <tr style="border-color: white;">
                                    <td width="723" style="border-color: white;">
                                     <p align="LEFT">
                                      <strong>Name und Vorname des Auszubildenden: </strong>${templateData[1]}, ${templateData[0]}
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p align="RIGHT"><strong>${templateData[2]}. Ausbildungsjahr</strong></p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p align="LEFT"><strong>Ausbildungsnachweis Nr.</strong> ${templateData[3]}</p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p align="RIGHT">
                                      <strong>für die Woche vom</strong> ${templateData[10]} bis ${templateData[14]}
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p align="LEFT"><strong>Betrieblicher Funktionsbereich:</strong> ${templateData[4]}</p>
                                    </td>
                                   </tr>
                                  </tbody>
                                 </table>
                                </div>
                               </div>
                               <div class="table-content">
                                <table width="723" border="2" CELLPADDING="3" cellspacing="0" align="CENTER" style="line-height:normal;">
                                 <tbody>
                                  <tr>
                                   <td width="74" align="CENTER">
                                    <strong>Datum</strong>
                                   </td>
                                   <td colspan="2" width="450" align="CENTER">
                                    <p style="margin-bottom:0;">
                                     <strong>
                                      Betriebliche Tätigkeiten, Betriebliche Schulungen,
                                      Berufsschulunterricht usw.
                                     </strong>
                                    </p>
                                   </td>
                                   <td width="74" align="CENTER">
                                    <p style="margin-bottom:0;">
                                     <strong>
                                      Einzel-
                                      <br/>
                                      stunden
                                     </strong>
                                    </p>
                                   </td>
                                   <td width="73" align="CENTER">
                                    <p style="margin-bottom:0;">
                                     <strong>Gesamt-stunden</strong>
                                    </p>
                                   </td>
                                  </tr>
                                   <tr>
                                    <td width="74">
                                     ${templateData[10]}
                                    </td>
                                    <td colspan="2" width="450">
                                     ${templateData[5]}
                                    </td>
                                    <td width="74">
                                     <p align="CENTER">
                                     </p>
                                    </td>
                                    <td width="73">
                                     <p align="CENTER">
                                      0
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td width="74">
                                     ${templateData[11]}
                                    </td>
                                    <td colspan="2" width="450">
                                     ${templateData[6]}
                                    </td>
                                    <td width="74">
                                     <p align="CENTER">
                                     </p>
                                    </td>
                                    <td width="73">
                                     <p align="CENTER">
                                      0
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td width="74">
                                     ${templateData[12]}
                                    </td>
                                    <td colspan="2" width="450">
                                     ${templateData[7]}
                                    </td>
                                    <td width="74">
                                     <p align="CENTER">
                                     </p>
                                    </td>
                                    <td width="73">
                                     <p align="CENTER">
                                      0
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td width="74">
                                     ${templateData[13]}
                                    </td>
                                    <td colspan="2" width="450">
                                     ${templateData[8]}
                                    </td>
                                    <td width="74">
                                     <p align="CENTER">
                                     </p>
                                    </td>
                                    <td width="73">
                                     <p align="CENTER">
                                      0
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td width="74">
                                     ${templateData[14]}
                                    </td>
                                    <td colspan="2" width="450">
                                     ${templateData[9]}
                                    </td>
                                    <td width="74">
                                     <p align="CENTER">
                                     </p>
                                    </td>
                                    <td width="73">
                                     <p align="CENTER">
                                      0
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td colspan="4" width="622">
                                     <p align="RIGHT">
                                      <strong>Gesamtstunden der Ausbildungswoche</strong>
                                     </p>
                                    </td>
                                    <td width="73" valign="TOP">
                                     <p align="CENTER">
                                      00
                                     </p>
                                    </td>
                                   </tr>
                                   <tr valign="TOP">
                                    <td colspan="2" width="410">
                                     <p align="RIGHT">
                                      <strong>Auszubildender</strong>
                                     </p>
                                     <p align="LEFT">
                                      ....................
                                      ...................................................
                                     </p>
                                     <p align="LEFT">
                                      Datum und Unterschrift
                                     </p>
                                    </td>
                                    <td colspan="3" width="285">
                                     <p align="RIGHT">
                                      <strong>Ausbildender bzw. Ausbilder</strong>
                                     </p>
                                     <p align="LEFT">
                                      ....................
                                      ................................................
                                     </p>
                                     <p align="LEFT">
                                      Datum und Unterschrift
                                     </p>
                                    </td>
                                   </tr>
                                  </tbody>
                                 </table>
                                </div>
                               </div>
                              </div>`;

        return rawTemplate;

    }

}

