import {CommentModel} from './Comment.model';

export interface Article {
  id?: number;
  title?:string;
  description?:string;
  created_by?:string;
  created_date?:string;
  updated_date?:string;
  liked?: boolean;
  like_nomber?: number;
  loved?:boolean;
  loved_nomber?:number;
  reaction?:boolean;
  reaction_nomber?:number;
  tags?: string[];
  comments?: CommentModel[];
}
