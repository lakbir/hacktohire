import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Observable, of} from 'rxjs';
import {AppDataState, DataStateEnum, ReactionEnum} from '../../state/article.state';
import {Article} from '../../models/Article.model';
import {catchError, map, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-home',
  templateUrl: './article-home.component.html',
  styleUrls: ['./article-home.component.css']
})
export class ArticleHomeComponent implements OnInit {
  articles$: Observable<AppDataState<Article[]>> | null=null;
  readonly DataStateEnum = DataStateEnum;
  currentArticle?: Article;
  newComment?:FormGroup;
  keywordToSearch: string = "";
  currentPage=0;
  totalPages:number;
  totalElement:number;

  constructor(private articleService: ArticleService,
              private fb:FormBuilder,
              private datePipe: DatePipe,
              private router:Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onGetAllArticles(this.currentPage);
    this.initializeCommentForm();
  }

  onGetAllArticles(page: number) {
    this.articles$ = this.articleService.getAllArticles(page)
      .pipe(
        map(data=>({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  onShowDetailsArticle(id: number) {
     this.articleService.getArticleById(id).subscribe(
       data => {
         this.currentArticle = data;
       }, err => {
         console.log(err);
       }
     )
  }

  addNewCommentToArticle() {
    this.currentArticle.comments.push(this.newComment.value);
    this.articleService.updateArticle(this.currentArticle).subscribe(
      data => {
        this.initializeCommentForm();
        this.toastr.success('Your comment has successfully added to this article', 'Success !');
      }, err => {
        console.log(err);
        this.toastr.warning('Error to add your comment, try again', 'Warning !');
      }
    )


  }

  initializeCommentForm(){
    this.newComment = this.fb.group({
      id:[55],
      comment:[null,[Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
      comment_date:[this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm'), Validators.required],
      author:["Current User",Validators.required]
    })
  }

  onSearchArticleByKeyword() {
    this.articles$ = this.articleService.getArticlesByKeyword(this.keywordToSearch, this.currentPage)
      .pipe(
        map(data=>({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  addReactionToArticle(type: string){
    switch (type) {
      case 'loved' :
          if(this.currentArticle.loved) this.currentArticle.loved_nomber--;
          else this.currentArticle.loved_nomber++;
          this.currentArticle.loved = !this.currentArticle.loved;
        break;
      case 'liked' :
        if(this.currentArticle.liked) this.currentArticle.like_nomber--;
        else this.currentArticle.like_nomber++;
        this.currentArticle.liked = !this.currentArticle.liked;
        break;
      case 'reaction' :
        if(this.currentArticle.reaction) this.currentArticle.reaction_nomber--;
        else this.currentArticle.reaction_nomber++;
        this.currentArticle.reaction = !this.currentArticle.reaction;
        break;
      default :
        break;
    }
    this.articleService.updateArticle(this.currentArticle).subscribe(
      data => {
        this.toastr.success('Your interaction with this this article has been recorded', 'Success !');
      }, err => {
        console.log(err);
        this.toastr.warning('Error, try again', 'Warning !');
      });
  }

  onEditArticle() {
      this.router.navigateByUrl("/articles/edit/"+this.currentArticle.id);
  }
}
