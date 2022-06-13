import  express from "express";
import cors from "cors";
import router from "./api/airbnb.routes.js";
import client_sessions from "client-sessions";


const app = express();

app.use(client_sessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "Airbnb_sample", // this should be a long un-guessable string.
    duration: 10 * 60 * 1000, // duration of the session in milliseconds (10 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}))
app.use(cors());
app.use(express.json());

app.use("/Airbnb/api", router);

app.use("*",(req, res)=>{res.status(404).json({error : "Not Found!"})});

export default app;