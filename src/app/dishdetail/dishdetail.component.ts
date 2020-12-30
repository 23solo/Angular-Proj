import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from './../shared/review';
import { Dish } from './../shared/dish';
import { DishService } from './../services/dish.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  review : Review;
  reviewForm : FormGroup;

  dish: Dish;
  prev: string;
  next : string;
  dishIds : string[];
  @ViewChild('rform') reviewFormDirective
  formErrors = {
    'name': '',
    'comment': ''
  };

  validationMessages = {
    'name': {
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
    private fb : FormBuilder) { 
      this.currentdate = new Date();
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) =>this.dishService.getDish(params['id'])))
    .subscribe((dish)=> {
      this.dish = dish;
      this.setPrevNext(dish.id);
    }
    );
    
  }

  createForm(){
    this.reviewForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      stars:[0],
      comment: ['', Validators.required],
      date: this.currentdate
    });
    this.reviewForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  onSubmit(){
    this.review = this.reviewForm.value;
    //console.log(this.review);
    this.reviewForm.reset({
      name:'',
      stars:'',
      comment:'',

    });
    this.reviewForm.reset({
      rating: 3,
      comment: '',
      author: '',
      date: this.currentdate
    });
    this.reviewFormDirective.resetForm({
      rating: 3,
      comment: '',
      author: '',
      date: this.currentdate
    });
    console.log(this.review)
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