import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../models/Article.model';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = environment.host;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getAllArticles(page: number):Observable<Article[]>{
    return this.http.get<Article[]>(this.apiUrl+`?_sort=id&_order=desc&_page=${page}&_limit=4`);
  }

  getArticleById(id:number):Observable<Article>{
    return this.http.get<Article>(this.apiUrl+id);
  }

  getFirstArticle():Observable<Article>{
    return this.http.get<Article>(this.apiUrl+"?_limit=1");
  }

  updateArticle(article: Article):Observable<Article>{
    return this.http.put<Article>(this.apiUrl+`${article.id}`, article);
  }

  getArticlesByKeyword(keyword: string, page:number):Observable<Article[]>{
    return this.http.get<Article[]>(this.apiUrl+`?title_like=${keyword}&_sort=id&_order=desc&_page=${page}&_limit=4`);
  }

  getAllArticlesByTag(page: number):Observable<Article[]>{
    return this.http.get<Article[]>(this.apiUrl);
  }

  addNewArticle(article: Article):Observable<Article>{
    article.created_by = "Current USER";
    article.created_date = this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm');
    article.loved_nomber = 0;
    article.loved = false;
    article.like_nomber = 0;
    article.liked = false;
    article.reaction_nomber = 0;
    article.reaction = false;
    article.tags = ['tag 1', 'tag 2', 'tag 3'];
    article.updated_date = "";
    article.comments = [];
    return this.http.post<Article>(this.apiUrl, article);
  }
}
