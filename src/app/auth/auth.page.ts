import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

// Services
import { GithubService } from '../shared/services/github.service';

// Models
import { User } from '../shared/models/user.model';
import {
    LoadingController,
    ToastController,
    NavController
} from '@ionic/angular';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
    public frmAuth: FormGroup;
    public feedback: string;

    constructor(
        private fb: FormBuilder,
        private githubService: GithubService,
        private loadingComponent: LoadingController,
        private toastController: ToastController,
        private navController: NavController,
        private storage: Storage
    ) {}

    ngOnInit() {
        this.feedback = undefined;
        this.initAuthForm();
        this.frmAuth.reset();
        this.resetDatabase();
    }

    initAuthForm(): void {
        this.frmAuth = this.fb.group({
            username: this.fb.control('', [Validators.required])
        });
    }

    verifyUser() {
        this.presentLoading();
        const username = this.frmAuth.get('username').value;
        this.githubService.getUser(username).subscribe(
            (githubUser: User) => {
                this.loadingComponent.dismiss(true).then(() => {
                    this.storage.set('user', JSON.stringify(githubUser));
                    this.navController.navigateForward('home');
                });
            },
            (err: Error) => {
                this.loadingComponent.dismiss(true);
                // if (err.message) {
                //     return (this.feedback = err.message);
                // }
                console.log(err);
                this.feedback = 'Username not found';
                this.presentToast();
            }
        );
    }

    resetDatabase(): void {
        this.storage.clear();
    }

    async presentLoading() {
        const loading = await this.loadingComponent.create({
            message: `Searching User...`
        });
        return await loading.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: this.feedback,
            duration: 2000
        });
        toast.present();
    }
}
