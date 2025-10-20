import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../client';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    //Required imports
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .client-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  //HTML for the form elements, including text fields and buttons
  template: `
    <form
      class="client-form"
      autocomplete="off"
      [formGroup]="clientForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="name" formControlName="name"  />
      </mat-form-field>

      <mat-radio-group formControlName="choice" aria-label="Select an option">
        <mat-radio-button name="choice" value="1" 
          >1</mat-radio-button
        >
        <mat-radio-button name="Choice" value="2"
          >2</mat-radio-button
        >
      </mat-radio-group>


      <button
        mat-raised-button
        color="primary"
        type="submit" 
        [disabled]="clientForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
//Export ClientForm
export class ClientForm {

  //Define client form form group
  clientForm!: FormGroup;

  //Events
  @Output()
  //Form values were changed
  formValueChanged = new EventEmitter<Client>();

  @Output()
  //Form was submitted
  formSubmitted = new EventEmitter<Client>();

  constructor(private formBuilder: FormBuilder){
    //Define what the form should have
    this.clientForm = this.formBuilder.group({
      //Name and choice are required
      name: ['', Validators.required],
      choice: ['', Validators.required]
    })

  } 
  
  //Returns the name element in the form
  get name() {
    return this.clientForm.get('name')!;
  }
  //Returns the choice element in the form
  get choice() {
    return this.clientForm.get('choice')!;
  }

  //On submit form
  submitForm() {
    //If the form is valid
    if(this.clientForm.valid){
      //emit the form values as a new client
      this.formSubmitted.emit(this.clientForm.value as Client);
    }
  }
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB