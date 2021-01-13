import { FeedbackService } from './../services/feedback.service';
import { Feedback, ContactType } from './../shared/feedback';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
      animations: [
        flyInOut(),
        expand()
      ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  
  @ViewChild('fform') feedbackFormDirective

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Phone number is required.',
      'pattern':       'Phone number must contain only numbers.',
      'minlength': 'Phone number must have 10 digits',
      'maxlength': 'Phone number must have 10 digits'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'message':{
      'required' : "Please provide some Feedback.."
    }
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
   }
  submit = false;
  ngOnInit() {
  }
  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern, Validators.minLength(10), Validators.maxLength(10)] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ['',Validators.required]
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
    
  }
  onSubmit(){
    this.submit = true;
    this.feedback = this.feedbackForm.value;
    this.feedbackService.postFeedback(this.feedback)
    .subscribe(feed => {
      this.feedback = feed;this.submit = false;
      setTimeout(() => {
        this.feedback = null;
      }, 5000) },
    errmess => { this.feedback = null; });
    
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm(); 
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

}
