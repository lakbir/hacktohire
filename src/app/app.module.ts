import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArticleHomeComponent } from './components/article-home/article-home.component';
import { ArticleSingleComponent } from './components/article-single/article-single.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import {AppRoutingModule} from './app-routing.module';
import { HacktohireComponent } from './components/hacktohire/hacktohire.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArticleHomeComponent,
    ArticleSingleComponent,
    EditArticleComponent,
    NewArticleComponent,
    HacktohireComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
