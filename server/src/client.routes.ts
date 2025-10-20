import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

//Define client router
export const clientRouter = express.Router();
clientRouter.use(express.json());

//Define client endpoints allowing the applicaiton to get, and modify items in the database

//Get clients endpoint
//This endpoint will allow the retrival of all clients in the database
clientRouter.get("/", async (_req, res) => {
    try {
        //use find method to search the clients collection, they toArray method to store each one in an array 
        const clients = await collections?.clients?.find({}).toArray();
        //send the array to client 
        res.status(200).send(clients);
        //catch any erors
    } catch (error) {
        //send error message
        res.status(500).send(error instanceof Error ? error.message : "Error Occured: type Unknown");
    }
});

//Get client id endpoint
//This endpoint will allow the retrival of one single client
clientRouter.get("/:id", async (req, res) => {
    try {
        //define the clients id being searched for, converting from a string to MOngoDB object ID
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        //use findOne method to search the clients collection for a matching client id
        const client = await collections?.clients?.findOne(query);
        //if the client is found
        if (client) {
            //send client information to client
            res.status(200).send(client);
        //else client not found
        } else {
            //send error message
            res.status(404).send(`Failed to find an client: ID ${id}`);
        }
        //catch any errors
    } catch (error) {
        //send error message
        res.status(404).send(`Failed to find an client: ID ${req?.params?.id}`);
    }
});


//Post client end point
//This endpoint will allow the creation of a new single client
clientRouter.post("/", async (req, res) => {
    try {
        //define client object (clients information)
        const client = req.body;
        //use insertOne method to instert the client into the clients collection
        const result = await collections?.clients?.insertOne(client);
        //if insertion was completed
        if (result?.acknowledged) {
            //send aknowledgement message, and the new clients id
            res.status(201).send(`Created a new client: ID ${result.insertedId}.`);
        //else insertion was not completed
        } else {
            //send error message
            res.status(500).send("Failed to create a new client.");
        }
        //catch any errors
    } catch (error) {
        //send error message
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Error Occured: type Unknown");
    }
});

//Put client endpoint
//This endpoint will allow updates to be performed on existing clients in the database
clientRouter.put("/:id", async (req, res) => {
    try {
        //defeines the clients id and object (clients information)
        const id = req?.params?.id;
        const client = req.body;
        //convert object id from string to mongoDB objectID
        const query = { _id: new ObjectId(id) };
        //Use updateOne method to update a client in the clients collection with a matching ID
        const result = await collections?.clients?.updateOne(query, { $set: client });
        //if update occured
        if (result && result.matchedCount) {
            //send aknowledgement message
            res.status(200).send(`Updated an client: ID ${id}.`);
        //else update did not occur
        } else if (!result?.matchedCount) {
            //send error message
            res.status(404).send(`Failed to find an client: ID ${id}`);
        } else {
            //send error message
            res.status(304).send(`Failed to update an client: ID ${id}`);
        }
    //catch any errors
    } catch (error) {
        //send error message
        const message = error instanceof Error ? error.message : "Error Occured: type Unknown";
        console.error(message);
        res.status(400).send(message);
    }
});

//delete client endpoint
//This endpoint will allow for the deletion of the a client in the database
clientRouter.delete("/:id", async (req, res) => {
    try {
        //define the clients id being searched for, converting from a string to MOngoDB object ID
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        //use deleteOne method to search the clients collection and delete the client with a matching id
        const result = await collections?.clients?.deleteOne(query);
        //if deletion occured
        if (result && result.deletedCount) {
            //send aknowledgement message
            res.status(202).send(`Removed an client: ID ${id}`);
        //else deletion did not occur
        } else if (!result) {
            //send error message
            res.status(400).send(`Failed to remove an client: ID ${id}`);
        } else if (!result.deletedCount) {
            //send error message
            res.status(404).send(`Failed to find an client: ID ${id}`);
        }
    //catch any errors
    } catch (error) {
        //send error message
        const message = error instanceof Error ? error.message : "Error Occured: type Unknown";
        console.error(message);
        res.status(400).send(message);
    }
});

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB



