import { Routes } from '@angular/router';
import { ClientListing } from './client-listing/client-listing';
import { AddClient } from './add-client/add-client';
import { EditClient } from './edit-client/edit-client';

//Define routes
export const routes: Routes = [
    //define paths for client listing, add client, and edit client components 
    { path: '', component: ClientListing, title: 'Clients List' },
    { path: 'new', component: AddClient},
    { path: 'edit/:id', component: EditClient},
];

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB