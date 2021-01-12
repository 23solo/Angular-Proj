import { Comment } from './../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from './../shared/review';
import { Dish } from './../shared/dish';
import { DishService } from './../services/dish.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dishcopy: Dish;
  review : Comment;
  reviewForm : FormGroup;
  errMsg : string;
  dish: Dish;
  prev: string;
  next : string;
  dishIds : string[];
  @ViewChild('rform') reviewFormDirective
  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 20 characters long.'
    },
    'comment' :{
      'required': 'Comment is required'
    }
  };

  currentdate: Date;
  

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb : FormBuilder,
    @Inject('BaseURL')private BaseURL) { 
      this.currentdate = new Date();
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
      err => this.errMsg = <any>err);
      this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
      err=> this.errMsg =<any>err);
    
  }

  createForm(){
    this.reviewForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating:[1],
      comment: ['', Validators.required],
      date: this.currentdate
    });
    this.reviewForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  onSubmit(){
    this.review = this.reviewForm.value;
    this.dishcopy.comments.push(this.review);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMsg = <any>errmess; });
    //console.log(this.review);
    this.reviewForm.reset({
      rating :'',
      comment:'',
      author : '',
      date:''

    });
    this.reviewFormDirective.resetForm();
  }

  
  onValueChanged(data?: any) {
    if (!this.reviewForm) { return; }
    const form = this.reviewForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] +  '  ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[( this.dishIds.length+index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length+ index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

}