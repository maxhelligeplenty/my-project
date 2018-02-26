import { Injectable } from '@angular/core';
import { GithubCommitService } from './github-commit.service';

@Injectable()
export class GetCommitMessagesService
{

    constructor(private _githubCommitService:GithubCommitService)
    {
    }

    public getAllCommitsOfBranch(bN:string,uN:string)
    {

    }

}

