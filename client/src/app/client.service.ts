import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client';

//Client service

@Injectable({
  providedIn: 'root'
})
//explort client service class
export class ClientService {
  //define url and signal
  private url = 'http://localhost:5200';
  clients$ = signal<Client[]>([]);
  client$ = signal<Client>({} as Client);
 
  //constructor
  constructor(private httpClient: HttpClient) { }

  //refresh clients method will collect all clients in the databse and save as a signal
  private refreshClients() {
    this.httpClient.get<Client[]>(`${this.url}/clients`)
      .subscribe(clients => {
        this.clients$.set(clients);
      });
  }

  //Get clients method returns all methods
  getClients() {
    //runs refresh clients method to get up to date list of clients, and returns all of the clients 
    this.refreshClients();
    return this.clients$();
  }

  //Get client method returns one client
  getClient(id: string) {
    this.httpClient.get<Client>(`${this.url}/clients/${id}`).subscribe(client => {
      this.client$.set(client);
      return this.client$();
    });
  }


  //Create client creates one client with entered information
  createClient(client: Client) {
    return this.httpClient.post(`${this.url}/clients`, client, { responseType: 'text' });
  }

  //Update client updates one client with selected ID and entered information
  updateClient(id: string, client: Client) {
    return this.httpClient.put(`${this.url}/clients/${id}`, client, { responseType: 'text' });
  }

  //Delete client deltes one client with selected ID
  deleteClient(id: string) {
    return this.httpClient.delete(`${this.url}/clients/${id}`, { responseType: 'text' });
  }
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB