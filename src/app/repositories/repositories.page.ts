import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, IonInfiniteScroll } from '@ionic/angular';

// Models
import { Repositories } from '../shared/models/repositories.model';
import { User } from '../shared/models/user.model';

@Component({
    selector: 'app-repositories',
    templateUrl: './repositories.page.html',
    styleUrls: ['./repositories.page.scss']
})
export class RepositoriesPage implements OnInit {
    public title: string;
    public user: User;
    public repositories: Repositories[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private storage: Storage,
        private navController: NavController
    ) {}

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.title = data.title;
            this.storage.get(data.storage).then((repositories: string) => {
                if (!repositories) {
                    return this.navController.navigateRoot('');
                }

                this.repositories = JSON.parse(repositories);
            });

            this.storage.get('user').then((user: string) => {
                if (!user) {
                    return this.navController.navigateRoot('');
                }

                this.user = JSON.parse(user);
            });
        });
    }

    loadData(event) {
        setTimeout(() => {
            console.log('Done');
            event.target.complete();

            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            // if (data.length == 1000) {
            //     event.target.disabled = true;
            // }
        }, 500);
    }

    redirectToRepository(repository: Repositories): void {
        window.location.href = `https://github.com/${repository.full_name}`;
    }
}
