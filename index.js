import app from "./server.js";
import {MongoClient} from "mongodb";
import {AirbnbDAO} from "./dao/airbnbDAO.js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.AIRBNB_DB_URI;
const client = new MongoClient(url);


client.connect()
.then((client)=>{
    console.log("Connected successfully to server");
    AirbnbDAO.injectDB(client)
    .then((collection)=>{
        console.log("Collection is connected successfully");
        app.listen(process.env.PORT, ()=>{
          console.log(`App is listening to port ${process.env.PORT}`);
    })    
    
    })
})
.catch((err)=>{
    console.error(`Error in connection database: ${err.message}`);
})



