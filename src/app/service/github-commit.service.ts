import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GithubCommitService
{

    constructor(private _http:Http)
    {
    }

    public getAllUserBranches(branchName:string, userName:string):Observable<any>
    {
        let headers = new Headers();
        let url:string = 'https://api.github.com/repos/' + userName + '/' + branchName + '/commits';

        return this._http.get(url,
            {
                headers: headers,
                body:    ''
            });
    }

}

