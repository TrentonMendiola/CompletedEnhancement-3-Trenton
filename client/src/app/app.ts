import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientListing } from './client-listing/client-listing';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  //required imports
  imports: [RouterOutlet, MatToolbarModule, ClientListing],
  //Toolbar
  template:  `
    <mat-toolbar>
      <span>Client Management Application</span>
    </mat-toolbar>
    <main>
      <router-outlet />
    </main>
  `,
  //Main display
  styles: [
     `
      main {
        display: fill;
        justify-content: left;
        padding: 2rem 4rem;
        background-color: #00e1ffff;
      }
    `,
  ],
})

//Export App
export class App {
  title = 'Client';
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB
