import { Component, OnInit, WritableSignal } from '@angular/core';
import { ClientForm } from '../client-form/client-form';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  //Required imports
  imports: [ClientForm, MatCardModule],
  //HTML to display client form
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit Client</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-client-form
          (formSubmitted)="editClient($event)"
        ></app-client-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
//Export EditCLient
export class EditClient implements OnInit {
  client = {} as WritableSignal<Client>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  //Called when page is rendered
  ngOnInit() {
    //Get selected client id from url
    const id = this.route.snapshot.paramMap.get('id');
    //if failed
    if (!id) {
      //display error messsage indicating no id 
      alert('No id provided');
    }
    //Get id
    this.clientService.getClient(id!);
    //Define this.client to use client interface and client service
    this.client = this.clientService.client$;
  }

  //Edit client will update the client with a match id with new informaiton from the form
  editClient(client: Client) {
    //update client 
    this.clientService
      .updateClient(this.client()._id || '', client)
      .subscribe({
        next: () => {
          //navigate back to homepage
          this.router.navigate(['/']);
        },
        //if any error occurs
        error: (error) => {
          //display error message
          alert('Failed to update client');
          console.error(error);
        },
      });
  }
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB