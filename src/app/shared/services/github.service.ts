import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Environment
import { environment } from 'src/environments/environment';

// Models
import { User } from '../models/user.model';
import { Repositories } from '../models/repositories.model';

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    constructor(private http: HttpClient) {}

    getUser(username: string): Observable<User> {
        return this.http.get(`${environment.apiUrl}/users/${username}`).pipe(
            map((githubUser: User) => {
                if (!githubUser) {
                    throw new Error();
                }
                return githubUser;
            })
        );
    }

    getStarredRepositories(username: string): Observable<Repositories> {
        return this.http
            .get(`${environment.apiUrl}/users/${username}/starred`)
            .pipe(
                map((starredRepositories: Repositories) => {
                    if (!starredRepositories) {
                        throw new Error();
                    }
                    return starredRepositories;
                })
            );
    }

    getRepositories(username: string): Observable<Repositories> {
        return this.http
            .get(`${environment.apiUrl}/users/${username}/repos`)
            .pipe(
                map((starredRepositories: Repositories) => {
                    if (!starredRepositories) {
                        throw new Error();
                    }
                    return starredRepositories;
                })
            );
    }
}
