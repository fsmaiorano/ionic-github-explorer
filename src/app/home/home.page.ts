import { Component, OnInit } from '@angular/core';
import {
    NavController,
    LoadingController,
    ActionSheetController,
    ToastController
} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Storage } from '@ionic/storage';

// Models
import { User } from '../shared/models/user.model';

// Services
import { GithubService } from '../shared/services/github.service';
import { Repositories } from '../shared/models/repositories.model';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    public user: User;
    public feedback: string;

    constructor(
        private navController: NavController,
        private router: ActivatedRoute,
        private storage: Storage,
        private loadingComponent: LoadingController,
        private actionSheetController: ActionSheetController,
        private githubService: GithubService,
        private toastController: ToastController
    ) {}

    ngOnInit() {
        this.feedback = undefined;
        this.storage.get('user').then((user: string) => {
            this.loadingComponent.dismiss(true);
            if (!user) {
                return this.navController.navigateRoot('');
            }
            this.user = JSON.parse(user);
        });
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Projects',
            buttons: [
                {
                    text: 'Starred Projects',
                    icon: 'star',
                    handler: () => {
                        console.log('star clicked');
                        this.githubService
                            .getStarredRepositories(this.user.login)
                            .subscribe(
                                (starredRepositories: Repositories) => {
                                    this.storage.set(
                                        'starred-repositories',
                                        JSON.stringify(starredRepositories)
                                    );
                                    this.navController.navigateForward(
                                        'starred-repositories'
                                    );
                                },
                                (err: Error) => {
                                    console.log(err);
                                    this.feedback =
                                        'An error has ocurred. Try again...';
                                    this.presentToast();
                                }
                            );
                    }
                },
                {
                    text: `${
                        this.user.name ? this.user.name : this.user.login
                    } - Projects`,
                    icon: 'person',
                    handler: () => {
                        console.log('person clicked');
                        this.githubService
                            .getRepositories(this.user.login)
                            .subscribe(
                                (repositories: Repositories) => {
                                    this.storage.set(
                                        'repositories',
                                        JSON.stringify(repositories)
                                    );
                                    this.navController.navigateForward(
                                        'repositories'
                                    );
                                },
                                (err: Error) => {
                                    console.log(err);
                                    this.feedback =
                                        'An error has ocurred. Try again...';
                                    this.presentToast();
                                }
                            );
                    }
                }
            ]
        });
        await actionSheet.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: this.feedback,
            duration: 2000
        });
        toast.present();
    }
}
