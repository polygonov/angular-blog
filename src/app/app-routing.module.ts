import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {RegistrationComponent} from "./registration/registration.component";


const routes: Routes = [
  {
    path: 'blog', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/posts', pathMatch: 'full'},    // {path: '', redirectTo: '/posts', pathMatch: 'full'}

      {path: ':id', component: HomePageComponent},
      //{path: 'posts', component: HomePageComponent},          // default// {path: 'posts', component: HomePageComponent}

      {path: ':id/:id', component: PostPageComponent}
    ]
  },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: '',
    redirectTo: '/admin/create',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
