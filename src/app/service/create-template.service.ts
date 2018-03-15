import { Injectable } from '@angular/core';

@Injectable()
export class CreateTemplateService
{

    public getTemplate(templateData)
    {

        let rawTemplate = `<div>
                              <div>
                               <div>
                                <div>
                                 <table>
                                  <tbody>
                                   <tr>
                                    <td>
                                     <p>
                                      <strong>Name und Vorname des Auszubildenden: </strong>${templateData[1]}, ${templateData[0]}
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p><strong>${templateData[2]}. Ausbildungsjahr</strong></p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p><strong>Ausbildungsnachweis Nr.</strong> ${templateData[3]}</p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p>
                                      <strong>für die Woche vom</strong> ${templateData[10]} bis ${templateData[14]}
                                     </p>
                                    </td>
                                   </tr>
                                   <tr>
                                    <td>
                                     <p><strong>Betrieblicher Funktionsbereich:</strong> ${templateData[4]}</p>
                                    </td>
                                   </tr>
                                  </tbody>
                                 </table>
                                </div>
                               </div>
                               <div>
                                <table border="2" cellpadding="3" cellspacing="0">
                                 <tbody>
                                  <tr>
                                   <td width="74">
                                    <strong>Datum</strong>
                                   </td>
                                   <td colspan="2" width="450">
                                    <p>
                                     <strong>
                                      Betriebliche Tätigkeiten, Betriebliche Schulungen,
                                      Berufsschulunterricht usw.
                                     </strong>
                                    </p>
                                   </td>
                                   <td width="74">
                                    <p>
                                     <strong>
                                      Einzel-
                                      <br/>
                                      stunden
                                     </strong>
                                    </p>
                                   </td>
                                   <td width="73">
                                    <p>
                                     <strong>Gesamt-stunden</strong>
                                    </p>
                                   </td>
                                  </tr>
                                   <tr>
                                    <td>
                                     ${templateData[10]}
                                    </td>
                                    <td colspan="2" width="450">
                                     ${templateData[5]}
                                    </td>
                                    <td width="74">
                                     <p>
                                     </p>
                                    </td>
                                    <td width="73">
                                      ${templateData[15]}
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
                                     <p>
                                     </p>
                                    </td>
                                    <td width="73">
                                      ${templateData[16]}
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
                                     <p>
                                     </p>
                                    </td>
                                    <td width="73">
                                      ${templateData[17]}
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
                                     <p>
                                     </p>
                                    </td>
                                    <td width="73">
                                      ${templateData[18]}
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
                                     <p>
                                     </p>
                                    </td>
                                    <td width="73">
                                      ${templateData[19]}
                                    </td>
                                   </tr>
                                   <tr>
                                    <td colspan="4" width="622">
                                      <strong>Gesamtstunden der Ausbildungswoche</strong>
                                    </td>
                                    <td width="73">
                                      ${templateData[20]}
                                    </td>
                                   </tr>
                                   <tr>
                                    <td colspan="2" width="410">
                                     <p>
                                      <strong>Auszubildender</strong>
                                     </p>
                                     <p>
                                      ....................
                                      ...................................................
                                     </p>
                                     <p>
                                      Datum und Unterschrift
                                     </p>
                                    </td>
                                    <td colspan="3" width="285">
                                     <p>
                                      <strong>Ausbildender bzw. Ausbilder</strong>
                                     </p>
                                     <p>
                                      ....................
                                      ................................................
                                     </p>
                                     <p>
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

