import * as mongodb from "mongodb";
import { Client } from "./client";

//Export client collection retrieved from database
export const collections: {
    clients?: mongodb.Collection<Client>;
} = {};

//Method for connecting to database
export async function connectToDatabase(uri: string) {
    //define mongo client object "client" using connection string defined as uri
    const client = new mongodb.MongoClient(uri);
    //connect to databse
    await client.connect();

    //define database
    const db = client.db("meanStackExample");
    //apply schema validation
    await applySchemaValidation(db);

    //define clients collection, using database object to retrieve "clients" collection
    const clientsCollection = db.collection<Client>("clients");
    collections.clients = clientsCollection;
}

// Update collection with JSON schema validation verifying that data will match client model
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        //Define schema
        $jsonSchema: {
            //each client object will only have name, choice, and id
            bsonType: "object",
            required: ["name", "choice"],
            additionalProperties: false,
            properties: {
                _id: {},
                //name will be a required string
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                //choice will be a required string
                choice: {
                    bsonType: "string",
                    description: "'choice' is required and is a string",
                },
            },
        },
    };

    //apply validation to client collection
   await db.command({
        collMod: "clients",
        validator: jsonSchema
        //if error is detected (collection does not exists)
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            //create the clients collection
            await db.createCollection("clients", {validator: jsonSchema});
        }
    });
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB
