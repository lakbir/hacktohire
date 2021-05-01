import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditArticleComponent} from './components/edit-article/edit-article.component';
import {NewArticleComponent} from './components/new-article/new-article.component';
import {ArticleHomeComponent} from './components/article-home/article-home.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
  {path : "articles/edit/:id", component: EditArticleComponent},
  {path : "articles/new", component: NewArticleComponent},
  {path : "auth/signup", component: SignupComponent},
  {path : "auth/login", component: LoginComponent},
  {path : "", component: ArticleHomeComponent},
  {path:'**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
