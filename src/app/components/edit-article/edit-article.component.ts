import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {ToastrService} from 'ngx-toastr';
import {Article} from '../../models/Article.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  articleId:number;
  articleFormGroup?:FormGroup;
  private submitted:boolean=false;
  article: Article;

  constructor(private activatedRoute:ActivatedRoute,
              private articleService:ArticleService,
              private toastr: ToastrService,
              private router: Router,
              private fb:FormBuilder) {
    this.articleId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {

    this.articleService.getArticleById(this.articleId)
      .subscribe(article=>{
        this.article = article;
        this.articleFormGroup=this.fb.group({
          id:[article.id,Validators.required],
          title:[article.title,[Validators.required, Validators.maxLength(200),Validators.minLength(10)]],
          description:[article.description,[Validators.required, Validators.maxLength(1000),Validators.minLength(50)]]
        })
      });
  }

  onUpdateArticle() {
    console.log()
    this.article.title = this.articleFormGroup.controls['title'].value;
    this.article.description = this.articleFormGroup.controls['description'].value;
    this.articleService.updateArticle(this.article).subscribe(
      data => {
        this.toastr.success('Article has successfully updated', 'Success !');
      }, err => {
        console.log(err);
        this.toastr.warning('Error to update Article, try again', 'Warning !');
      }
    );
    this.router.navigateByUrl("/");

  }
}
