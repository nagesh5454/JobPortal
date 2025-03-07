import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});
import emailRoutes from './routes/emailRoutes.js';


const app = express();
const _dirname=path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://jobportal-9amg.onrender.com',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);  //http://localhost:8000/api/v1/user
app.use("/api/v1/company", companyRoute);  //http://localhost:8000/api/v1/company
app.use("/api/v1/job", jobRoute);    //http://localhost:8000/api/v1/job
app.use("/api/v1/application", applicationRoute); //http://localhost:8000/api/v1/application
app.use('/api/email', emailRoutes);


app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})