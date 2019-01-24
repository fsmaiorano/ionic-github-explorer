import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-repositories',
    templateUrl: './repositories.page.html',
    styleUrls: ['./repositories.page.scss']
})
export class RepositoriesPage implements OnInit {
    public title: string;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.title = data.title;
        });
    }
}
