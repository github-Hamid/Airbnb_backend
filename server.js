import  express from "express";
import cors from "cors";
import router from "./api/airbnb.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/Airbnb/api", router);
app.use("*",(req, res)=>{res.status(404).json({error : "Not Found!"})});

export default app;