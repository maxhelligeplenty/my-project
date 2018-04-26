import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Headers,
    Http
} from '@angular/http';

@Injectable()
export class GithubCommitService
{

    constructor(private _http:Http)
    {
    }

    public getAllUserBranches(user:string, repo:string, branch:string):Observable<any>
    {
        let headers = new Headers();

        let url:string = 'https://api.github.com/repos/' + user + '/' + repo + '/commits?sha=' + branch;

        return this._http.get(url,
            {
                headers: headers,
                body:    ''
            });
    }

}