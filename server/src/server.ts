import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { clientRouter } from "./client.routes";


// Load variables from .env file
dotenv.config();

//define the ATLAS_URI variable with data from env file
const { ATLAS_URI } = process.env;

//if the ATLAS_URI is not found
if (!ATLAS_URI) {
  //display eror message indicating there is no ATLAS_URI defined
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  //exit
  process.exit(1);
}

//Make connection to database
connectToDatabase(ATLAS_URI)
  .then(() => {
    //set up express server
    const app = express();
    app.use(cors());

    //setup express server to utilize client routes
    app.use("/clients", clientRouter);

    // start the Express server
    app.listen(5200, () => {
      //server will run on localhost:5200
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  //catch any errors
  .catch((error) => console.error(error));

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB
