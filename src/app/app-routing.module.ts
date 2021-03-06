import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
    {
        path: 'starred-repositories',
        loadChildren:
            './repositories/repositories.module#RepositoriesPageModule',
        data: {
            title: 'Starred Repositories',
            storage: 'starred-repositories'
        }
    },
    {
        path: 'repositories',
        loadChildren:
            './repositories/repositories.module#RepositoriesPageModule',
        data: {
            title: 'Repositories',
            storage: 'repositories'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
