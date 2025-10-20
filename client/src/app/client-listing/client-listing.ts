import { Component, OnInit, WritableSignal } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-clients-listing',
  standalone: true,
  //require imports
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 101%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  //HTML template, displays buttons and table filled with clients
  template: `
    <mat-card>

      <mat-card-header>
        <mat-card-title>Client List</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <table mat-table [dataSource]="clients$()">

          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>

          <ng-container matColumnDef="col-choice">
            <th mat-header-cell *matHeaderCellDef>choice</th>
            <td mat-cell *matCellDef="let element">{{ element.choice }}</td>
          </ng-container>

          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteClient(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Client
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
//Export client listing
export class ClientListing implements OnInit {
  clients$ = {} as WritableSignal<Client[]>;

  //Define each of the columns
  displayedColumns: string[] = [
    'col-name',
    'col-choice',
    'col-action',
  ];

  constructor(private clientsService: ClientService) {}

  //Called when page is rendered
  ngOnInit() {
    //use fetch clients to pull all clients from database
    this.fetchClients();
  }

  //Delete client when delete button is pressed
  deleteClient(id: string): void {
    //use client id of the client matching the button from the table
    this.clientsService.deleteClient(id).subscribe({
      //refresh all current clients in the databse
      next: () => this.fetchClients(),
    });
  }

  //Fetch clients will pull all clients from database
  private fetchClients(): void {
    //using client service get clients method
    this.clients$ = this.clientsService.clients$;
    this.clientsService.getClients();
  }
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB