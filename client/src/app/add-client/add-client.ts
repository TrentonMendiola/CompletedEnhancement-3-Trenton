import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientForm } from '../client-form/client-form';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-client',
  standalone: true,
  //Required imports
  imports: [ClientForm, MatCardModule],
  //HTML to display client form
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Client</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-client-form
          (formSubmitted)="addClient($event)"
        ></app-client-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
//Export AddClient
export class AddClient {
  constructor(
    private router: Router,
    private clientService: ClientService
  ) {}

  //Add client will add a single client to the database, using data entered in the form
  addClient(client: Client) {
    //When submit button is pressed
    this.clientService.createClient(client).subscribe({
      next: () => {
        //Navigate back to homepage
        this.router.navigate(['/']);
      },
      //if any error occurs
      error: (error) => {
        //display error message
        alert('Failed to create client');
        console.error(error);
      },
    });
    //Pull the new list of clients from the database
    this.clientService.getClients();
  }
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB