
import * as mongodb from "mongodb";
//Defines the interface for a client
export interface Client {
    //each client will have name, choice either 1 or 2, and id
    name: string;
    choice: "1" | "2";
    _id?: mongodb.ObjectId;
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB